import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateMarketUpdateDto } from "./create-market-update.dto";
import { IsBoolean } from "class-validator";

export class UpdateMarketUpdateDto extends PartialType(CreateMarketUpdateDto) {
  @IsBoolean()
  @ApiProperty({ example: true, description: "Indicates whether market update is archived or not" })
  isArchived: true;
}
