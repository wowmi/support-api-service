// src/market-update/entities/market-update.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MarketUpdateTask } from "./task.entity";

@Entity()
export class MarketUpdate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("datetime")
  _date: string;

  @Column("text")
  description: string;

  @OneToMany(() => MarketUpdateTask, (task) => task.marketUpdate)
  tasks: MarketUpdateTask[];
}
