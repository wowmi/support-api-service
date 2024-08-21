import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  ParseUUIDPipe,
  Delete,
  Get,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { MarketUpdateService } from "./market-update.service";
import { CreateMarketUpdateDto } from "./dto/create-market-update.dto";
import { CreateMarketUpdateTaskDto } from "./dto/create-task.dto";
import { MarketUpdate } from "./entities/market-update.entity";
import { UpdateMarketUpdateDto } from "./dto/update-market-update.dto";
import { MarketUpdateTask } from "./entities/task.entity";
import { UpdateMarketUpdateTaskDto } from "./dto/update-task.dto";

@ApiTags("market-update")
@Controller("market-update")
export class MarketUpdateController {
  constructor(private readonly marketUpdateService: MarketUpdateService) {}

  @Post()
  @ApiOperation({ summary: "Create a new market update" })
  @ApiResponse({
    status: 201,
    description: "Market update has been successfully created",
    type: MarketUpdate,
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  createMarketUpdate(@Body() createMarketUpdateDto: CreateMarketUpdateDto) {
    return this.marketUpdateService.createMarketUpdate(createMarketUpdateDto);
  }

  @Get()
  @ApiOperation({ summary: "Get list of market updates" })
  @ApiQuery({ name: "page", required: false, description: "Page number (default 1)", example: 1 })
  @ApiQuery({ name: "per_page", required: false, description: "Items per page (default 10)", example: 10 })
  @ApiQuery({
    name: "is_archived",
    required: false,
    description: "Get only archived items (dafault fale)",
    example: false,
  })
  @ApiResponse({
    status: 200,
    type: MarketUpdate,
    isArray: true,
  })
  getMarketUpdateList(
    @Query("page", ParseIntPipe) page: number = 1,
    @Query("per_page", ParseIntPipe) perPage: number = 10,
    @Query("is_archived", ParseBoolPipe) isArchived: boolean = false,
  ) {
    return this.marketUpdateService.getMarketUpdateList(page, perPage, isArchived);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get market update data" })
  @ApiResponse({
    status: 200,
    type: MarketUpdate,
  })
  getMarketUpdateData(@Param("id", ParseUUIDPipe) id: string) {
    return this.marketUpdateService.getMarketUpdateData(id);
  }

  @Put("/:id")
  @ApiOperation({ summary: "Update market update" })
  @ApiResponse({
    status: 201,
    description: "Market update has been successfully updated",
    type: MarketUpdate,
  })
  updateMarketUpdate(@Param("id", ParseUUIDPipe) id: string, @Body() body: UpdateMarketUpdateDto) {
    return this.marketUpdateService.updateMarketUpdate(id, body);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Delete market update" })
  @ApiResponse({
    status: 201,
    description: "Market update has been successfully updated",
    type: MarketUpdate,
  })
  deleteMarketUpdate(@Param("id", ParseUUIDPipe) id: string) {
    return this.marketUpdateService.deleteMarketUpdate(id);
  }

  @Post("tasks")
  @ApiOperation({ summary: "Create a new market update task" })
  @ApiResponse({
    status: 201,
    description: "The market update task has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  createTask(@Body() createMarketUpdateTaskDto: CreateMarketUpdateTaskDto) {
    return this.marketUpdateService.createTask(createMarketUpdateTaskDto);
  }

  @Put("tasks/:id")
  @ApiOperation({ summary: "Update task" })
  @ApiResponse({ status: 201, type: MarketUpdateTask })
  updateTask(@Param("id", ParseUUIDPipe) id: string, @Body() body: UpdateMarketUpdateTaskDto) {
    return this.marketUpdateService.updateTask(id, body);
  }

  @Delete("tasks/:id")
  @ApiOperation({ summary: "Delete Task" })
  @ApiResponse({ status: 201, type: MarketUpdateTask })
  deleteTask(@Param("id", ParseUUIDPipe) id: string) {
    return this.marketUpdateService.deleteTask(id);
  }

  // getTasksByMarketUpdateId() {}
}
