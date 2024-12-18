import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddCategoryDTO } from '../dtos/addCategoryDTO';
import { CategoriesService } from './categories.service';
import { Category } from '../models/category';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  addCategory(@Body() addCategoryDTO: AddCategoryDTO): Category {
    return this.categoriesService.addCategory(addCategoryDTO);
  }

  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId') categoryId: number) {
    this.categoriesService.deleteCategory(categoryId);
  }
}
