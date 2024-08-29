import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductCategory } from "./entities/product_categories.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ProductContent } from "./entities/content.entity";
import { AzureFileService } from "../files/files.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { log } from "console";
import { plainToClass } from "class-transformer";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoriesRepository: Repository<ProductCategory>,
    @InjectRepository(ProductContent)
    private readonly contentRepository: Repository<ProductContent>,
    @Inject()
    private readonly fileService: AzureFileService,
  ) {}
  async createProduct(categoryId: string, createProductDto: CreateProductDto, image?: Express.Multer.File) {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    const product = this.productsRepository.create({
      ...createProductDto,
      category,
    });
    if (image) {
      const imageUrl = await this.fileService.uploadFile(image);
      product.image = imageUrl;
    }

    return this.productsRepository.save(product);
  }

  findProduct(id: string) {
    return this.productsRepository.findOne({
      where: { id },
      relations: { content: true },
    });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto, image?: Express.Multer.File) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto);
    if (image) {
      await this.fileService.deleteFile(product.image);
      product.image = await this.fileService.uploadFile(image);
    }
    return this.productsRepository.save(product);
  }

  async removeProduct(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (product && product.image) {
      await this.fileService.deleteFile(product.image);
    }
    return this.productsRepository.delete({ id });
  }

  async createCategory(dto: CreateCategoryDto, image?: Express.Multer.File): Promise<ProductCategory> {
    const category = this.categoriesRepository.create(dto);
    if (image) {
      category.image = await this.fileService.uploadFile(image);
    }
    return this.categoriesRepository.save(category);
  }

  deleteCategory(id: string) {
    return this.categoriesRepository.delete({ id });
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    const categories = await this.categoriesRepository.find({
      relations: { products: true },
    });
    console.log(`categories: ${categories}`);
    return categories;
  }

  async getProductContent(productId: string): Promise<ProductContent[]> {
    const content = await this.contentRepository.find({
      where: { product: { id: productId } },
    });
    if (content) {
      return content;
    }
    throw new NotFoundException(`No content found for product with id ${productId}`);
  }

  async createProductContent(
    id: string,
    updateContentDto: CreateContentDto,
    image?: Express.Multer.File,
  ): Promise<ProductContent> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["content"],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    let content: ProductContent;
    if (updateContentDto.id) {
      content = product.content.find((c) => c.id === updateContentDto.id);
      if (!content) {
        throw new NotFoundException(`Content with ID ${updateContentDto.id} not found`);
      }
    } else {
      content = this.contentRepository.create();
      content.product = product;
      product.content.push(content);
    }

    if (image) {
      if (content.image) {
        await this.fileService.deleteFile(content.image);
      }
      const imageUrl = await this.fileService.uploadFile(image);
      content.image = imageUrl;
    }

    Object.assign(content, updateContentDto);
    await this.contentRepository.save(content);

    return plainToClass(ProductContent, content);
  }

  async updateProductContent(
    contentId: string,
    updateContentDto: CreateContentDto,
    image?: Express.Multer.File,
  ): Promise<ProductContent> {
    const content = await this.contentRepository.findOne({
      where: { id: contentId },
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${contentId} not found`);
    }

    if (image) {
      if (content.image) {
        await this.fileService.deleteFile(content.image);
      }
      const imageUrl = await this.fileService.uploadFile(image);
      content.image = imageUrl;
    }

    Object.assign(content, updateContentDto);
    await this.contentRepository.save(content);

    return plainToClass(ProductContent, content);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: CreateCategoryDto,
    image?: Express.Multer.File,
  ): Promise<ProductCategory> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (image) {
      if (category.image) {
        await this.fileService.deleteFile(category.image);
      }
      const imageUrl = await this.fileService.uploadFile(image);
      category.image = imageUrl;
    }

    Object.assign(category, updateCategoryDto);
    await this.categoriesRepository.save(category);

    return plainToClass(ProductCategory, category);
  }
}
