import { IsString, IsOptional, IsUrl, IsUUID, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";
import { Transform } from "class-transformer";

export class CreateContentDto {
  @ApiProperty({ example: faker.string.uuid() })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiProperty({ example: faker.lorem.words(3) })
  @IsString()
  title: string;

  @ApiProperty({ example: faker.lorem.sentences(2), required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: faker.lorem.sentences(2), required: false })
  @IsOptional()
  @IsString()
  script?: string;

  @ApiProperty({ example: faker.lorem.sentences(2), required: false })
  @IsOptional()
  @IsString()
  instagram_body?: string;

  @ApiProperty({ example: faker.lorem.sentences(2), required: false })
  @IsOptional()
  @IsString()
  fb_linkedin_body?: string;

  @ApiProperty({ example: faker.lorem.sentences(2), required: false })
  @IsOptional()
  @IsUrl()
  link_concatenated?: string;

  @ApiProperty({ example: faker.number.int(), required: false })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  content_id?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  order: number;
}
