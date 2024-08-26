import { faker } from "@faker-js/faker/locale/af_ZA";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateVideoDto {
  @ApiProperty({
    description: "Type of asset (products or market-update)",
    example: "products",
    enum: ["products", "market-update"],
  })
  @IsString()
  @IsIn(["products", "market-update"], {
    message: "Asset type must be one of following: products, market-update",
  })
  assetType: string;

  @IsUUID()
  @ApiProperty({ example: faker.string.uuid() })
  assetId: string;

  @ApiProperty({
    description: "processingStatus must be 1 (in progress), 2(created) or 3(failed)",
    example: 1,
    enum: [1, 2, 3],
  })
  @IsInt()
  @IsIn([1, 2, 3], {
    message: "processingStatus must be 1, 2 or 3",
  })
  processingStatus: number;

  //   @ApiPropertyOptional({ example: faker.internet.url() })
  //   @IsUrl()
  //   @IsOptional()
  //   url?: string;
}
