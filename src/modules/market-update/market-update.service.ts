// src/market-update/market-update.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MarketUpdate } from "./entities/market-update.entity";
import { MarketUpdateTask } from "./entities/task.entity";
import { CreateMarketUpdateDto } from "./dto/create-market-update.dto";
import { CreateMarketUpdateTaskDto } from "./dto/create-task.dto";
import { UpdateMarketUpdateDto } from "./dto/update-market-update.dto";
import { UpdateMarketUpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class MarketUpdateService {
  constructor(
    @InjectRepository(MarketUpdate)
    private marketUpdateRepository: Repository<MarketUpdate>,
    @InjectRepository(MarketUpdateTask)
    private marketUpdateTaskRepository: Repository<MarketUpdateTask>,
  ) {}

  async createMarketUpdate(createMarketUpdateDto: CreateMarketUpdateDto): Promise<MarketUpdate> {
    const marketUpdate = this.marketUpdateRepository.create(createMarketUpdateDto);
    return this.marketUpdateRepository.save(marketUpdate);
  }
  getMarketUpdateList(page: number, perPage: number, isArchived: boolean): Promise<MarketUpdate[]> {
    const skipAmount = (page - 1) * perPage;
    return this.marketUpdateRepository.find({
      skip: skipAmount,
      take: perPage,
      order: {
        _date: "DESC",
      },
      select: ["id", "title", "isArchived", "_date"],
      where: { isArchived },
    });
  }

  getMarketUpdateData(id: string): Promise<MarketUpdate> {
    return this.marketUpdateRepository.findOne({ where: { id } });
  }

  async updateMarketUpdate(id: string, dto: UpdateMarketUpdateDto): Promise<MarketUpdate> {
    const marketUpdate = await this.marketUpdateRepository.findOne({
      where: { id },
    });

    if (marketUpdate) {
      Object.assign(marketUpdate, dto);
      return this.marketUpdateRepository.save(marketUpdate);
    }

    throw new NotFoundException(`Market update with ID ${id} not found`);
  }

  deleteMarketUpdate(id: string) {
    return this.marketUpdateRepository.delete(id);
  }

  archiveMarketUpdate(id: string) {
    return this.updateMarketUpdate(id, { isArchived: true });
  }

  async createTask(createMarketUpdateTaskDto: CreateMarketUpdateTaskDto): Promise<MarketUpdateTask> {
    const marketUpdate = await this.marketUpdateRepository.findOne({
      where: { id: createMarketUpdateTaskDto.market_update_id },
    });
    const marketUpdateTask = this.marketUpdateTaskRepository.create({
      ...createMarketUpdateTaskDto,
      marketUpdate,
    });
    return this.marketUpdateTaskRepository.save(marketUpdateTask);
  }

  async getTaskByMarketUpdateId(id: string): Promise<MarketUpdateTask[]> {
    return this.marketUpdateTaskRepository.find({
      where: { marketUpdate: { id } },
    });
  }

  async updateTask(id: string, dto: UpdateMarketUpdateTaskDto): Promise<MarketUpdateTask> {
    const task = await this.marketUpdateTaskRepository.findOne({ where: { id } });

    if (task) {
      Object.assign(task, dto);
      return this.marketUpdateTaskRepository.save(task);
    }

    throw new NotFoundException(`Market update task with ID ${id} not found`);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.marketUpdateTaskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Market update task with ID ${id} not found`);
    }
  }
}
