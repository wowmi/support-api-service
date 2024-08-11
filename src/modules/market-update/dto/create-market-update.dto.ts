import { IsString, IsNotEmpty, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMarketUpdateDto {
  @ApiProperty({ description: "The title of the market update" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "The date of the market update" })
  @IsDateString()
  _date: string;

  @ApiProperty({ description: "The description of the market update" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
