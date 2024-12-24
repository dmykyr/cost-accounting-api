import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddCategoryDTO } from '../dtos/addCategoryDTO';
import { CategoriesService } from './categories.service';
import { Category } from '../database/models/category';
import { JwtAuthGuard } from '../guards/jwtAuthGuard';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addCategory(@Body() addCategoryDTO: AddCategoryDTO): Promise<Category> {
    return this.categoriesService.addCategory(addCategoryDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: number) {
    await this.categoriesService.deleteCategory(categoryId);
  }
}
