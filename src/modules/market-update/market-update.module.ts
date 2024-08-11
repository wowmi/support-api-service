// src/market-update/market-update.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MarketUpdateService } from "./market-update.service";
import { MarketUpdateController } from "./market-update.controller";
import { MarketUpdate } from "./entities/market-update.entity";
import { MarketUpdateTask } from "./entities/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MarketUpdate, MarketUpdateTask])],
  controllers: [MarketUpdateController],
  providers: [MarketUpdateService],
})
export class MarketUpdateModule {}
