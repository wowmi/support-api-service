// src/market-update/entities/market-update.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MarketUpdateTask } from "./task.entity";

@Entity()
export class MarketUpdate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "date" })
  _date: string;

  @Column()
  description: string;

  @OneToMany(() => MarketUpdateTask, (task) => task.marketUpdate)
  tasks: MarketUpdateTask[];
}
