import { User } from '../models/user';
import { AddUserDto } from '../dtos/addUserDto';

export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'Luka' },
    { id: 2, name: 'Dorm' },
    { id: 3, name: 'Isak' },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  addUser(user: AddUserDto) {
    this.users.push(user);
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex((user) => user.id == id);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return true;
    }

    return false;
  }
}
