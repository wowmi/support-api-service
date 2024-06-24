import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Article } from "../article/articles.entity";

@Entity({ name: "knowledge" })
export class Knowledge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  icon: string;

  @Column()
  @ApiProperty()
  description: string;

  @OneToMany(() => Article, (article) => article.knowledge)
  public articles: Article[];
}
