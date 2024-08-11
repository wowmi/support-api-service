import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";
import { ProductCategory } from "./product_categories.entity";
import { ProductContent } from "./content.entity";
import { Exclude, Type } from "class-transformer";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  id: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    { onDelete: "SET NULL" },
  )
  @JoinColumn({ name: "category_id" })
  @ApiProperty({ example: faker.string.uuid() })
  @Exclude() // Exclude this property from serialization to avoid circular dependency
  category: ProductCategory;

  @OneToMany(() => ProductContent, (content) => content.product, {
    cascade: true,
  })
  @ApiProperty({ type: () => [ProductContent] })
  @Type(() => ProductContent) // Transform this property correctly
  content: Relation<ProductContent[]>;

  @Column("text")
  @ApiProperty({ example: faker.lorem.words(3) })
  title: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.internet.url() })
  image: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.words(3) })
  description: string;
}
