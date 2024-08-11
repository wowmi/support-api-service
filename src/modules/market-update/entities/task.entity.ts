import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MarketUpdate } from "./market-update.entity";

@Entity()
export class MarketUpdateTask {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  content_id: string;

  @Column()
  type: string;

  @Column()
  script: string;

  @Column()
  title: string;

  @Column()
  week_description: string;

  @Column()
  instagram_body: string;

  @Column()
  fb_linkedin_body: string;

  @Column()
  link_concatenateated: string;

  @ManyToOne(() => MarketUpdate, (marketUpdate) => marketUpdate.tasks)
  marketUpdate: MarketUpdate;
}
