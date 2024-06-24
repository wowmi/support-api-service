import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Knowledge } from "../knowledge/knowledge.entity";

@Entity({ name: "articles" })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  subtitle: string;

  @Column()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @Column("text", { nullable: true })
  images: string;

  getImagesArray(): string[] {
    return JSON.parse(this.images || "[]");
  }

  setImagesArray(links: string[]): void {
    this.images = JSON.stringify(links);
  }

  @ManyToOne(() => Knowledge, (knowledge) => knowledge.articles)
  @JoinColumn({ name: "knowledge_id" })
  public knowledge: Knowledge;
}
