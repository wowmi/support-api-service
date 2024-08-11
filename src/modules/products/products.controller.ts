import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Product } from "./entities/product.entity";
import { ProductCategory } from "./entities/product_categories.entity";
import { ProductContent } from "./entities/content.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateContentDto } from "./dto/create-content.dto";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("/categories")
  @ApiOperation({
    summary: "Get categories list",
    description: "Retrieves a list of all product categories.",
  })
  @ApiResponse({
    status: 200,
    description: "The categories have been successfully retrieved.",
    type: [ProductCategory],
  })
  getProductCategories() {
    console.debug("controller func");
    return this.productsService.getProductCategories();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Find product by ID",
    description: "Retrieves a product by its ID.",
  })
  @ApiParam({
    name: "id",
    description: "ID of the product",
  })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully retrieved.",
    type: Product,
  })
  getProductById(@Param("id") id: string) {
    console.debug("findProduct");
    return this.productsService.findProduct(id);
  }

  @Get("/content/:id")
  @ApiOperation({
    summary: "Find product content by ID",
    description: "Retrieves a product by its ID.",
  })
  @ApiParam({
    name: "id",
    description: "ID of the product",
  })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully retrieved.",
    type: ProductContent,
    isArray: true,
  })
  getContentByProductId(@Param("id") productId: string) {
    return this.productsService.getProductContent(productId);
  }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  @ApiOperation({
    summary: "Create product",
    description:
      "Creates a new product and assigns it to the specified category.",
  })
  @ApiQuery({
    name: "category_id",
    description: "ID of the product category",
    required: true,
    type: String,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        image: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: Product,
  })
  createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Query("category_id") categoryId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.createProduct(categoryId, createProductDto);
  }

  @Post("/category")
  @ApiOperation({
    summary: "Create product category",
    description: "Creates a new product category.",
  })
  @ApiResponse({
    status: 201,
    description: "The product category has been successfully created.",
    type: ProductCategory,
  })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update product",
    description: "Updates an existing product by its ID.",
  })
  @ApiParam({
    name: "id",
    description: "ID of the product",
  })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully updated.",
    type: Product,
  })
  updateProduct(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete product",
    description: "Deletes a product by its ID.",
  })
  @ApiParam({
    name: "id",
    description: "ID of the product",
  })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully deleted.",
  })
  removeProduct(@Param("id") id: string) {
    return this.productsService.removeProduct(id);
  }

  @Delete("/category/:id")
  @ApiOperation({
    summary: "Delete product category",
    description: "Deletes a product category by its ID.",
  })
  @ApiParam({
    name: "id",
    description: "ID of the product category",
  })
  @ApiResponse({
    status: 200,
    description: "The product category has been successfully deleted.",
  })
  deleteCategory(@Param("id") id: string) {
    return this.productsService.deleteCategory(id);
  }

  @Post("content/:id")
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        image: {
          type: "string",
          format: "binary",
        },
        script: { type: "string" },
        instagram_body: { type: "string" },
        fb_linkedin_body: { type: "string" },
        link_concatenated: { type: "string" },
        content_id: { type: "string" },
      },
    },
  })
  @ApiOperation({
    summary: "Update Product Content",
  })
  @ApiResponse({
    status: 200,
    description: "The content has been successfully updated.",
    type: ProductContent,
  })
  @ApiParam({ name: "id", description: "ID of the product" })
  updateProductContent(
    @Param("id") id: string,
    @Body() updateContentDto: CreateContentDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.productsService.updateProductContent(
      id,
      updateContentDto,
      image,
    );
  }
}
