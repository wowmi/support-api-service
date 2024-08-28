import { faker } from "@faker-js/faker/locale/af_ZA";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

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
    example: 1,
    description: "Order in which item will be displayed on the list",
  })
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  order: number;
}
