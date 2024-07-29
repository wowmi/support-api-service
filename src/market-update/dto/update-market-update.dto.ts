import { PartialType } from '@nestjs/swagger';
import { CreateMarketUpdateDto } from './create-market-update.dto';

export class UpdateMarketUpdateDto extends PartialType(CreateMarketUpdateDto) {}
