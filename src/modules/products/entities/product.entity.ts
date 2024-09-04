import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
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

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products, { onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  @ApiProperty({ example: faker.string.uuid() })
  @Exclude()
  category: ProductCategory;

  @OneToMany(() => ProductContent, (content) => content.product, {
    cascade: true,
  })
  @ApiProperty({ type: () => [ProductContent] })
  @Type(() => ProductContent)
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

  @Column("int")
  @ApiProperty({ example: 1 })
  order: number;
}
