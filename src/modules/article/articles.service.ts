import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "./articles.entity";
import { Knowledge } from "../knowledge/knowledge.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Knowledge)
    private knowledgeRepository: Repository<Knowledge>,
  ) {}

  findAll(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ["knowledge"] });
  }

  async findByKnowledge(knowledgeId: number): Promise<Article[]> {
    const articles = await this.articleRepository
      .createQueryBuilder("article")
      .innerJoin(
        "article.knowledge",
        "knowledge",
        "knowledge.id = :knowledgeId",
        { knowledgeId },
      )
      .getMany();

    if (!articles.length) {
      throw new HttpException(
        `No articles found for knowledge with id ${knowledgeId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return articles;
  }

  findOne(id: number): Promise<Article> {
    return this.articleRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }

  async create(
    article: Partial<Article>,
    knowledgeId: number,
  ): Promise<Article> {
    const knowledge = await this.knowledgeRepository.findOne({
      where: { id: knowledgeId },
    });
    if (!knowledge) {
      throw new HttpException(
        `Knowledge with id ${knowledgeId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Create the new article from the given object
    const newArticle = this.articleRepository.create(article);

    if (Array.isArray(article.images)) {
      newArticle.images = JSON.stringify(article.images);
    }

    newArticle.knowledge = knowledge;

    return this.articleRepository.save(newArticle);
  }

  async update(
    id: number,
    updatedArticle: { knowledgeId: number; [key: string]: any },
  ): Promise<Article> {
    const articleToUpdate = await this.articleRepository.findOne({
      where: { id },
    });
    if (!articleToUpdate) {
      throw new HttpException(
        `Article with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updatedArticle.knowledgeId) {
      const knowledge = await this.knowledgeRepository.findOne({
        where: { id: updatedArticle.knowledgeId },
      });
      if (!knowledge) {
        throw new HttpException(
          `Knowledge with id ${updatedArticle.knowledgeId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      delete updatedArticle.knowledgeId;
      articleToUpdate.knowledge = knowledge;
    }

    Object.assign(articleToUpdate, updatedArticle);
    await this.articleRepository.save(articleToUpdate);

    return this.articleRepository.findOne({
      where: { id },
      relations: ["knowledge"],
    });
  }
}
