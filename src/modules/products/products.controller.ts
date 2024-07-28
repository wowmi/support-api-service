// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Query,
// } from "@nestjs/common";
// import { ProductsService } from "./products.service";
// import { CreateProductDto } from "./dto/create-product.dto";
// import { UpdateProductDto } from "./dto/update-product.dto";
// import {
//   ApiOperation,
//   ApiParam,
//   ApiQuery,
//   ApiResponse,
//   ApiTags,
// } from "@nestjs/swagger";
// import { CreateCategoryDto } from "./dto/create-category.dto";
// import { Product } from "./entities/product.entity";
// import { ProductCategory } from "./entities/product_categories.entity";

// @ApiTags("Products")
// @Controller("products")
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Post()
//   @ApiQuery({
//     name: "category_id",
//     description: "ID of the product category",
//     required: true,
//   })
//   @ApiOperation({
//     summary: "Create product",
//     description:
//       "Creates a new product and assigns it to the specified category.",
//   })
//   @ApiResponse({
//     status: 201,
//     description: "The product has been successfully created.",
//     type: Product,
//   })
//   createProduct(
//     @Query("category_id") productCategoryId: string,
//     @Body() createProductDto: CreateProductDto,
//   ) {
//     return this.productsService.createProduct(
//       productCategoryId,
//       createProductDto,
//     );
//   }

//   @Post("/category")
//   @ApiOperation({
//     summary: "Create product category",
//     description: "Creates a new product category.",
//   })
//   @ApiResponse({
//     status: 201,
//     description: "The product category has been successfully created.",
//     type: ProductCategory,
//   })
//   createCategory(@Body() createCategoryDto: CreateCategoryDto) {
//     return this.productsService.createCategory(createCategoryDto);
//   }

//   @Get(":id")
//   @ApiOperation({
//     summary: "Find product by ID",
//     description: "Retrieves a product by its ID.",
//   })
//   @ApiParam({
//     name: "id",
//     description: "ID of the product",
//   })
//   @ApiResponse({
//     status: 200,
//     description: "The product has been successfully retrieved.",
//     type: Product,
//   })
//   findProduct(@Param("id") id: string) {
//     console.debug("findProduct");
//     return this.productsService.findProduct(id);
//   }

//   @Get("/categories")
//   @ApiOperation({
//     summary: "Get categories list",
//     description: "Retrieves a list of all product categories.",
//   })
//   @ApiResponse({
//     status: 200,
//     description: "The categories have been successfully retrieved.",
//     type: [ProductCategory],
//   })
//   getCategoriesList() {
//     console.debug("controller func");
//     return this.productsService.getCategoryList();
//   }

//   @Patch(":id")
//   @ApiOperation({
//     summary: "Update product",
//     description: "Updates an existing product by its ID.",
//   })
//   @ApiParam({
//     name: "id",
//     description: "ID of the product",
//   })
//   @ApiResponse({
//     status: 200,
//     description: "The product has been successfully updated.",
//     type: Product,
//   })
//   updateProduct(
//     @Param("id") id: string,
//     @Body() updateProductDto: UpdateProductDto,
//   ) {
//     return this.productsService.updateProduct(id, updateProductDto);
//   }

//   @Patch("category/:id")
//   @ApiOperation({
//     summary: "Update product category",
//     description: "Updates an existing product category by its ID.",
//   })
//   @ApiParam({
//     name: "id",
//     description: "ID of the product category",
//   })
//   @ApiResponse({
//     status: 200,
//     description: "The product category has been successfully updated.",
//     type: ProductCategory,
//   })
//   updateCategory(@Param("id") id: string, @Body() dto: CreateCategoryDto) {
//     return this.productsService.updateCategory(id, dto);
//   }

//   @Delete(":id")
//   @ApiOperation({
//     summary: "Delete product",
//     description: "Deletes a product by its ID.",
//   })
//   @ApiParam({
//     name: "id",
//     description: "ID of the product",
//   })
//   @ApiResponse({
//     status: 200,
//     description: "The product has been successfully deleted.",
//   })
//   removeProduct(@Param("id") id: string) {
//     return this.productsService.removeProduct(id);
//   }

//   @Delete("category/:id")
//   @ApiOperation({
//     summary: "Delete product category",
//     description: "Deletes a product category by its ID.",
//   })
//   @ApiParam({
//     name: "id",
//     description: "ID of the product category",
//   })
//   @ApiResponse({
//     status: 200,
//     description: "The product category has been successfully deleted.",
//   })
//   deleteCategory(@Param("id") id: string) {
//     return this.productsService.deleteCategory(id);
//   }
// }
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Product } from "./entities/product.entity";
import { ProductCategory } from "./entities/product_categories.entity";

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
  getCategoriesList() {
    console.debug("controller func");
    return this.productsService.getCategoryList();
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
  findProduct(@Param("id") id: string) {
    console.debug("findProduct");
    return this.productsService.findProduct(id);
  }

  @Post()
  @ApiQuery({
    name: "category_id",
    description: "ID of the product category",
    required: true,
  })
  @ApiOperation({
    summary: "Create product",
    description:
      "Creates a new product and assigns it to the specified category.",
  })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: Product,
  })
  createProduct(
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
}
