import { faker } from "@faker-js/faker/locale/af_ZA";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: faker.lorem.words(2) })
  @IsString()
  @IsNotEmpty()
  name: string;
}
