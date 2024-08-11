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
}
