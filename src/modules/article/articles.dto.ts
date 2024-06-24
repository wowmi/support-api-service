import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Knowledge } from "../knowledge/knowledge.entity";
import { KnowledgeResponseDto } from "../knowledge/knowledge.dto";

export class ArticleDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  subtitle: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty({ type: [String], description: "Images URLs" })
  images: string[];
}
export class ArticleBaseDto extends ArticleDto {
  @IsNumber()
  @ApiProperty()
  id: number = -1;
}

export class CreateArticleDto extends ArticleDto {
  @IsNumber()
  @ApiProperty()
  knowledgeId: number;
}

export class ArticleResponseDto extends ArticleDto {
  @IsNumber()
  @ApiProperty()
  id: number = -1;

  @IsOptional()
  @ApiProperty({ type: () => KnowledgeResponseDto })
  knowledge: KnowledgeResponseDto;
}
