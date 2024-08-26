import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Videos")
@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @ApiOperation({ summary: "Create video for products or market update" })
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Put()
  @ApiOperation({ summary: "Update video" })
  update(@Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(updateVideoDto);
  }

  @Get(":assetId")
  @ApiOperation({ summary: "Get Video by asset id" })
  get(@Param("assetId", ParseUUIDPipe) assetId: string) {
    return this.videosService.findByAssetId(assetId);
  }
}
