import { InjectRepository } from "@nestjs/typeorm";
import { Knowledge } from "./knowledge.entity";
import { Repository } from "typeorm";
import { CreateKnowledgeDto } from "./knowledge.dto";
import { NotFoundException } from "@nestjs/common";

export class KnowledgeService {
  constructor(
    @InjectRepository(Knowledge)
    private readonly knowledgeRepo: Repository<Knowledge>,
  ) {}
  async create(dto: CreateKnowledgeDto) {
    const knowledge = this.knowledgeRepo.create(dto);
    return this.knowledgeRepo.save(knowledge);
  }

  async getAll(): Promise<Knowledge[]> {
    return await this.knowledgeRepo.find({ relations: ["articles"] });
  }

  async getById(id: number): Promise<Knowledge> {
    const knowledge = await this.knowledgeRepo.findOne({
      where: { id },
      relations: ["articles"],
    });
    if (!knowledge) {
      throw new NotFoundException(`Knowledge with ID ${id} not found.`);
    }
    return knowledge;
  }

  async update(id: number, dto: CreateKnowledgeDto): Promise<Knowledge> {
    await this.knowledgeRepo.update({ id }, dto);
    const updatedKnowledge = await this.knowledgeRepo.findOne({
      where: { id },
    });
    if (!updatedKnowledge) {
      throw new NotFoundException(`Knowledge with ID ${id} not found.`);
    }
    return updatedKnowledge;
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.knowledgeRepo.delete({ id });
    if (!deleteResult.affected) {
      throw new NotFoundException(`Knowledge with ID ${id} not found.`);
    }
  }
}
