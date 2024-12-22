import { User } from '../database/models/user';
import { AddUserDto } from '../dtos/addUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../accounts/account.service';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: { account: true } });
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async addUser(dto: AddUserDto): Promise<User> {
    const user = await this.userRepository.save({ name: dto.name });
    await this.accountService.addAccount({ userId: user.id, initialBalance: 0 });
    return user;
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
}
