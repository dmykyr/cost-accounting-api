import { User } from '../models/user';
import { Category } from '../models/category';
import { AddCategoryDTO } from '../dtos/addCategoryDTO';

export class CategoriesService {
  private readonly categories: Category[] = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Medicine' },
    { id: 3, name: 'Entertainment' },
  ];

  getAllCategories(): Category[] {
    return this.categories;
  }

  addCategory(categoryDTO: AddCategoryDTO) {
    const maxId = this.categories.map((category) => category.id).sort((a, b) => b - a)[0];
    this.categories.push({ id: maxId + 1, name: categoryDTO.name });
  }

  deleteCategory(id: number): boolean {
    const userIndex = this.categories.findIndex((user) => user.id == id);

    if (userIndex !== -1) {
      this.categories.splice(userIndex, 1);
      return true;
    }

    return false;
  }
}
