// src/market-update/market-update.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MarketUpdate } from "./entities/market-update.entity";
import { MarketUpdateTask } from "./entities/task.entity";
import { CreateMarketUpdateDto } from "./dto/create-market-update.dto";
import { CreateMarketUpdateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class MarketUpdateService {
  constructor(
    @InjectRepository(MarketUpdate)
    private marketUpdateRepository: Repository<MarketUpdate>,
    @InjectRepository(MarketUpdateTask)
    private marketUpdateTaskRepository: Repository<MarketUpdateTask>,
  ) {}

  async createMarketUpdate(
    createMarketUpdateDto: CreateMarketUpdateDto,
  ): Promise<MarketUpdate> {
    const marketUpdate = this.marketUpdateRepository.create(
      createMarketUpdateDto,
    );
    return this.marketUpdateRepository.save(marketUpdate);
  }

  async createMarketUpdateTask(
    createMarketUpdateTaskDto: CreateMarketUpdateTaskDto,
  ): Promise<MarketUpdateTask> {
    const marketUpdate = await this.marketUpdateRepository.findOne(
      createMarketUpdateTaskDto.market_update_id,
    );
    const marketUpdateTask = this.marketUpdateTaskRepository.create({
      ...createMarketUpdateTaskDto,
      marketUpdate,
    });
    return this.marketUpdateTaskRepository.save(marketUpdateTask);
  }

  // Add other methods as needed, like findAll, findOne, update, remove
}
