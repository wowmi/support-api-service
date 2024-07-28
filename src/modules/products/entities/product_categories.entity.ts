import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";
import { Product } from "./product.entity";

@Entity({ name: "product_categories" })
export class ProductCategory {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  id: string;

  @Column("text")
  @ApiProperty({ example: "Mortgage Products" })
  category_name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
