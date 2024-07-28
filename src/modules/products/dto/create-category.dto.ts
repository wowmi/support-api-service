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

export class CreateCategoryDto {
  @ApiProperty({ example: faker.lorem.words(2) })
  @IsString()
  @IsNotEmpty()
  category_name: string;
}
