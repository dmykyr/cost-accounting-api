import { Injectable, PipeTransform, NotFoundException, BadRequestException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../database/models/category';

@Injectable()
export class RecordByIdPipe implements PipeTransform {
  constructor(private readonly categoriesService: CategoriesService) {}

  async transform(value: any): Promise<Category> {
    const recordId = parseInt(value, 10);

    if (isNaN(recordId) || recordId <= 0) {
      throw new BadRequestException('Category Id must be a positive number');
    }

    const record = await this.categoriesService.getCategory(recordId);
    if (!record) {
      throw new NotFoundException(`Category with Id ${recordId} not found`);
    }

    return record;
  }
}
