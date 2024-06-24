import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "./articles.entity";
import { ArticleService } from "./articles.service";
import { ArticleController } from "./articles.controller";
import { Knowledge } from "../knowledge/knowledge.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Article, Knowledge])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
