import { PartialType } from "@nestjs/mapped-types";
import { CreateMarketUpdateTaskDto } from "./create-task.dto";

export class UpdateMarketUpdateTaskDto extends PartialType(CreateMarketUpdateTaskDto) {}
