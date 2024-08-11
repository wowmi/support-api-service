import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { Product } from "./entities/product.entity";
import { ProductCategory } from "./entities/product_categories.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductContent } from "./entities/content.entity";
import { AzureFileService } from "../files/files.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory, ProductContent]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, AzureFileService],
})
export class ProductsModule {}
