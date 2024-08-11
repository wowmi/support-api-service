import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";
import { Product } from "./product.entity";
import { Exclude } from "class-transformer";

@Entity({ name: "products_content" })
export class ProductContent {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  id: string;

  @ManyToOne(() => Product, (product) => product.content, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  @ApiProperty({ example: faker.string.uuid() })
  @Exclude() // Exclude this property from serialization to avoid circular dependency
  product: Relation<Product>;

  @Column("text")
  @ApiProperty({ example: faker.lorem.words(3) })
  title: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.internet.url() })
  image: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.words(3) })
  description: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.sentence(10) })
  script: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.sentences(4) })
  instagram_body: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.lorem.sentences(4) })
  fb_linkedin_body: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.internet.url() })
  link_concatenated: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.string.uuid() })
  content_id: string;
}
