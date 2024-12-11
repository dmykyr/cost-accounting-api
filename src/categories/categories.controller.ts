import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AddCategoryDTO } from '../dtos/addCategoryDTO';

@Controller('category')
export class CategoriesController {
  @Get()
  getAllCategories() {}

  @Post()
  addCategory(@Body() addCategoryDTO: AddCategoryDTO) {}

  @Delete()
  deleteCategory() {}
}
