import { InjectRepository } from "@nestjs/typeorm";
import { Knowledge } from "./knowledge.entity";
import { Repository } from "typeorm";
import { CreateKnowledgeDto } from "./knowledge.dto";
import { NotFoundException } from "@nestjs/common";
import {
  BaseResponse,
  withArrayBaseResponse,
  withSingleBaseResponse,
} from "src/helper/base-response.dto";

export class KnowledgeService {
  constructor(
    @InjectRepository(Knowledge)
    private readonly knowledgeRepo: Repository<Knowledge>,
  ) {}
  async create(dto: CreateKnowledgeDto, iconUrl?: string) {
    const knowledge = this.knowledgeRepo.create({
      ...dto,
      icon: iconUrl ? iconUrl : null, // Ensure the icon is set if URL is provided
    });
    const createdKnowledge = await this.knowledgeRepo.save(knowledge);
    const ResponseDTO = withSingleBaseResponse(Knowledge);
    return new ResponseDTO(true, 200, "Fetched Successfully", createdKnowledge);
  }

  async getAll(): Promise<BaseResponse<Knowledge[]>> {
    const result = await this.knowledgeRepo.find({ relations: ["articles"] });
    if (result.length) {
      const ResponseDTO = withArrayBaseResponse(Knowledge);
      return new ResponseDTO(true, 200, "Fetched Successfully", result);
    }
    throw new NotFoundException(`Knowledges not found.`);
  }

  async getById(id: number): Promise<BaseResponse<Knowledge>> {
    const knowledge = await this.knowledgeRepo.findOne({
      where: { id },
      relations: ["articles"],
    });
    if (!knowledge) {
      throw new NotFoundException(`Knowledge with ID ${id} not found.`);
    }
    const ResponseDTO = withSingleBaseResponse(Knowledge);
    return new ResponseDTO(true, 200, "Fetched Successfully", knowledge);
  }

  async update(
    id: number,
    dto: CreateKnowledgeDto,
    iconUrl?: string,
  ): Promise<BaseResponse<Knowledge>> {
    await this.knowledgeRepo.update(
      { id },
      {
        ...dto,
        icon: iconUrl ? iconUrl : null,
      },
    );
    const updatedKnowledge = await this.knowledgeRepo.findOne({
      where: { id },
    });
    if (!updatedKnowledge) {
      throw new NotFoundException(`Knowledge with ID ${id} not found.`);
    }
    const ResponseDTO = withSingleBaseResponse(Knowledge);
    return new ResponseDTO(true, 201, "Fetched Successfully", updatedKnowledge);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.knowledgeRepo.delete({ id });
    if (!deleteResult.affected) {
      throw new NotFoundException(`Knowledge with ID ${id} not found.`);
    }
  }
}
