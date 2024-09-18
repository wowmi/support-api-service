import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ArticleBaseDto, ArticleResponseDto } from "../article/articles.dto";

export class CreateKnowledgeDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;
}

export class KnowledgeResponseDto extends CreateKnowledgeDto {
  @IsNumber()
  @ApiProperty()
  id: number = -1;
}

export class GetKnowledgeResponseDto extends KnowledgeResponseDto {
  @IsOptional()
  @ApiProperty({ type: () => [ArticleBaseDto] })
  articles: ArticleBaseDto[];
}
