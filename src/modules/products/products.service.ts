import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductCategory } from "./entities/product_categories.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly categoriesRepository: Repository<ProductCategory>,
  ) {}
  async createProduct(categoryId: string, createProductDto: CreateProductDto) {
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

    return this.productsRepository.save(product);
  }

  findAll() {
    return `This action returns all products`;
  }

  findProduct(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  removeProduct(id: string) {
    return this.productsRepository.delete({ id });
  }

  createCategory(dto: CreateCategoryDto): Promise<ProductCategory> {
    const category = this.categoriesRepository.create(dto);
    return this.categoriesRepository.save(category);
  }

  deleteCategory(id: string) {
    return this.categoriesRepository.delete({ id });
  }

  async updateCategory(
    id: string,
    dto: CreateCategoryDto,
  ): Promise<ProductCategory> {
    const existingCategory = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (existingCategory) {
      Object.assign(existingCategory, dto);
      return this.categoriesRepository.save(existingCategory);
    }
  }

  async getCategoryList(): Promise<ProductCategory[]> {
    const categories = await this.categoriesRepository.find({
      relations: { products: true },
    });
    console.log(`categories: ${categories}`);
    return categories;
  }
}
