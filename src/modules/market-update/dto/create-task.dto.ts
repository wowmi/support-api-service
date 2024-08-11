import { IsString, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMarketUpdateTaskDto {
  @ApiProperty({ description: "The type of the task" })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: "The script of the task" })
  @IsString()
  @IsNotEmpty()
  script: string;

  @ApiProperty({ description: "The title of the task" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "The week description of the task" })
  @IsString()
  @IsNotEmpty()
  week_description: string;

  @ApiProperty({ description: "The Instagram body of the task" })
  @IsString()
  @IsNotEmpty()
  instagram_body: string;

  @ApiProperty({ description: "The Facebook/LinkedIn body of the task" })
  @IsString()
  @IsNotEmpty()
  fb_linkedin_body: string;

  @ApiProperty({ description: "The concatenated link for the task" })
  @IsString()
  @IsNotEmpty()
  link_concatenateated: string;

  @ApiProperty({ description: "The ID of the related market update" })
  @IsUUID()
  market_update_id: string;
}
