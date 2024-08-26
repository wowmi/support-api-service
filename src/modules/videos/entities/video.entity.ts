import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  id: string;

  @Column("text", { name: "asset_type" })
  @ApiProperty({ enum: ["products", "market-update"] })
  assetType: string;

  @Column("uuid", { name: "asset_id" })
  @ApiProperty({ example: faker.string.uuid(), description: "Id of a product or market update" })
  assetId: string;

  @Column("tinyint", { name: "processing_status" })
  @ApiProperty({
    example: 1,
    enum: {
      IN_PROGRESS: 1,
      CREATED: 2,
      FAILED: 3,
    },
  })
  processingStatus: string;

  @Column("text", { nullable: true })
  @ApiProperty({ example: faker.internet.url() })
  url: string;
}
