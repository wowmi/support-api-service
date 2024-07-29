import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MarketUpdateService } from "./market-update.service";
import { CreateMarketUpdateDto } from "./dto/create-market-update.dto";
import { CreateMarketUpdateTaskDto } from "./dto/create-task.dto";

@ApiTags("market-update")
@Controller("market-update")
export class MarketUpdateController {
  constructor(private readonly marketUpdateService: MarketUpdateService) {}

  @Post()
  @ApiOperation({ summary: "Create a new market update" })
  @ApiResponse({
    status: 201,
    description: "The market update has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  createMarketUpdate(@Body() createMarketUpdateDto: CreateMarketUpdateDto) {
    return this.marketUpdateService.createMarketUpdate(createMarketUpdateDto);
  }

  @Post("task")
  @ApiOperation({ summary: "Create a new market update task" })
  @ApiResponse({
    status: 201,
    description: "The market update task has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  createMarketUpdateTask(
    @Body() createMarketUpdateTaskDto: CreateMarketUpdateTaskDto,
  ) {
    return this.marketUpdateService.createMarketUpdateTask(
      createMarketUpdateTaskDto,
    );
  }
}
