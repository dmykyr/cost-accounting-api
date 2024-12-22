import { Category } from '../database/models/category';
import { Repository } from 'typeorm';
import { AddCategoryDTO } from '../dtos/addCategoryDTO';
import { InjectRepository } from '@nestjs/typeorm';

export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async addCategory(categoryDTO: AddCategoryDTO): Promise<Category> {
    return this.categoryRepository.save({ name: categoryDTO.name });
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
