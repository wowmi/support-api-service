import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MarketUpdate } from "./market-update.entity";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";

@Entity()
export class MarketUpdateTask {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  id: string;

  @Column("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  content_id: string;

  @Column("text")
  @ApiProperty({ example: "Video" })
  type: string;

  @Column("text")
  script: string;

  @Column("text")
  title: string;

  @Column("text")
  week_description: string;

  @Column("text")
  instagram_body: string;

  @Column("text")
  fb_linkedin_body: string;

  @Column("text")
  link_concatenated: string;

  @ManyToOne(() => MarketUpdate, (marketUpdate) => marketUpdate.tasks)
  marketUpdate: MarketUpdate;
}
