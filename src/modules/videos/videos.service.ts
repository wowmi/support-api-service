import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./entities/video.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class VideosService {
  constructor(@InjectRepository(Video) private readonly repository: Repository<Video>) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const existingVideo = await this.repository.findOne({ where: { assetId: createVideoDto.assetId } });
    if (existingVideo) {
      await this.repository.remove(existingVideo);
    }
    const newVideo = this.repository.create();
    Object.assign(newVideo, createVideoDto);
    return this.repository.save(newVideo);
  }

  async update(updateVideoDto: UpdateVideoDto): Promise<Video> {
    const existingVideo = await this.repository.findOne({ where: { assetId: updateVideoDto.assetId } });
    if (existingVideo) {
      Object.assign(existingVideo, updateVideoDto);
      return this.repository.save(existingVideo);
    }
    throw new BadRequestException(`Video for asset with id ${updateVideoDto.assetId} not found`);
  }

  findByAssetId(assetId: string): Promise<Video> {
    return this.repository.findOne({ where: { assetId } });
  }
}
