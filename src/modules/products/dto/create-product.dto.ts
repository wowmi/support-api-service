import { faker } from "@faker-js/faker/locale/af_ZA";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: faker.lorem.word(3),
    description: "The title of the product",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: faker.lorem.lines(5),
    description: "The description of the product",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: [faker.lorem.sentence()],
    description: "Array of video scripts related to the product",
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  video_script: string[];

  @ApiPropertyOptional({
    example: faker.lorem.paragraph(),
    description: "The Instagram body content for the product",
  })
  @IsString()
  @IsOptional()
  instagram_body?: string;

  @ApiPropertyOptional({
    example: faker.lorem.paragraph(),
    description: "The Facebook/LinkedIn body content for the product",
  })
  @IsString()
  @IsOptional()
  fb_linkedin_body?: string;

  @ApiPropertyOptional({
    example: faker.internet.url(),
    description: "A concatenated link for the product",
  })
  @IsString()
  @IsOptional()
  link_concatenated?: string;

  @ApiPropertyOptional({
    example: faker.string.uuid(),
    description: "The content ID associated with the product",
  })
  @IsString()
  @IsUUID()
  content_id: string;
}
