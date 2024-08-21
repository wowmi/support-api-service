import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MarketUpdateTask } from "./task.entity";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from "@faker-js/faker";
import { Transform } from "class-transformer";

@Entity()
export class MarketUpdate {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ example: faker.string.uuid() })
  id: string;

  @Column("text")
  @ApiProperty({ example: faker.lorem.words(2) })
  title: string;

  @Column("date")
  @Transform(({ value }) => (value ? value.toISOString().split("T")[0] : value))
  @ApiProperty({ example: "2012-12-31" })
  _date: string;

  @Column("text")
  @ApiProperty({ example: faker.lorem.sentences(3) })
  description: string;

  @Column("bool", { name: "is_archived", default: false })
  isArchived: boolean;

  @OneToMany(() => MarketUpdateTask, (task) => task.marketUpdate, {
    cascade: true,
    onDelete: "CASCADE",
  })
  tasks: MarketUpdateTask[];
}
