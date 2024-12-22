import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddCategoryDTO } from '../dtos/addCategoryDTO';
import { CategoriesService } from './categories.service';
import { Category } from '../database/models/category';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  async addCategory(@Body() addCategoryDTO: AddCategoryDTO): Promise<Category> {
    return this.categoriesService.addCategory(addCategoryDTO);
  }

  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: number) {
    await this.categoriesService.deleteCategory(categoryId);
  }
}
