import { User } from '../database/models/user';
import { AddUserDto } from '../dtos/addUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: { account: true } });
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async addUser(dto: AddUserDto): Promise<User> {
    return this.userRepository.save({ name: dto.name });
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
}
