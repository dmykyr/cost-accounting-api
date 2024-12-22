import {
  Injectable,
  PipeTransform,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from '../database/models/record';

@Injectable()
export class RecordByIdPipe implements PipeTransform {
  constructor(private readonly recordsService: RecordsService) {}

  async transform(value: any): Promise<Record> {
    const recordId = parseInt(value, 10);

    if (isNaN(recordId) || recordId <= 0) {
      throw new BadRequestException('Record Id must be a positive number');
    }

    const record = await this.recordsService.getRecord(recordId);
    if (!record) {
      throw new NotFoundException(`Record with Id ${recordId} not found`);
    }

    return record;
  }
}
