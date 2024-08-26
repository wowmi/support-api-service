import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateVideoDto } from "./create-video.dto";
import { IsIn, IsInt, IsOptional, IsUrl, IsUUID } from "class-validator";
import { faker } from "@faker-js/faker";

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid() })
  assetId: string;

  @ApiProperty({
    description: "processingStatus must be 1 (in progress), 2(created) or 3(failed)",
    example: 1,
    enum: [1, 2],
  })
  @IsInt()
  @IsIn([1, 2, 3], {
    message: "processingStatus must be 1, 2 or 3",
  })
  @IsInt()
  processingStatus: number;

  @ApiPropertyOptional({ example: faker.internet.url() })
  @IsUrl()
  @IsOptional()
  url?: string;
}
