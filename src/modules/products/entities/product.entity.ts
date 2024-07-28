import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";
import { ProductCategory } from "./product_categories.entity";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  id: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
  )
  @ApiProperty({ example: faker.string.uuid() })
  category: ProductCategory;

  @Column("text")
  @ApiProperty({ example: faker.lorem.words(3) })
  title: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.internet.url() })
  image: string;

  @Column("int", { default: 8 })
  @ApiProperty({ example: 3 })
  content_amount: number;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.words(3) })
  placeholder_title: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.internet.url() })
  placeholder_image: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.lines({ min: 1, max: 3 }) })
  placeholder_description: string;

  @Column("simple-json", { nullable: true })
  @ApiProperty({ example: faker.internet.url(), isArray: true })
  videos: string[];

  @Column("simple-json", { nullable: true })
  @ApiProperty({
    example: faker.lorem.lines({ min: 1, max: 3 }),
    isArray: true,
  })
  video_script: string[];

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.lines({ min: 2, max: 5 }) })
  instagram_body: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.lines({ min: 2, max: 5 }) })
  fb_linkedin_body: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.internet.url() })
  link_concatenated: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.string.uuid() })
  content_id: string;

  @Column("int", { nullable: true })
  @ApiProperty({ example: 8 })
  video_amount: number;

  getPlaceholderData() {
    return {
      image: this.placeholder_image,
      title: this.placeholder_title,
      desription: this.placeholder_description,
    };
  }
}
