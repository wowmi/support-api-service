import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import {
  CreateKnowledgeDto,
  GetKnowledgeResponseDto,
  KnowledgeResponseDto,
} from "./knowledge.dto";
import { KnowledgeService } from "./knowledge.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("knowledge")
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post()
  @ApiOperation({
    summary: "Create knowledge",
  })
  @ApiResponse({
    status: 201,
    type: KnowledgeResponseDto,
  })
  async create(@Body() dto: CreateKnowledgeDto) {
    return await this.knowledgeService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all knowledge",
  })
  @ApiResponse({
    status: 200,
    type: [GetKnowledgeResponseDto],
  })
  async getAll() {
    return await this.knowledgeService.getAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get knowledge by id",
  })
  @ApiResponse({
    status: 200,
    type: GetKnowledgeResponseDto,
  })
  async getById(@Param("id") id: number) {
    return await this.knowledgeService.getById(id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update knowledge by id",
  })
  @ApiResponse({
    status: 200,
    type: GetKnowledgeResponseDto,
  })
  async update(@Param("id") id: number, @Body() dto: CreateKnowledgeDto) {
    return await this.knowledgeService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete knowledge by id",
  })
  @ApiResponse({
    status: 200,
  })
  async delete(@Param("id") id: number) {
    await this.knowledgeService.delete(id);
    return { message: "Knowledge removed successfully." };
  }
}
