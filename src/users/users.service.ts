import { User } from '../database/models/user';
import { AddUserDto } from '../dtos/addUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AccountService } from '../accounts/account.service';
import * as bcrypt from 'bcrypt';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: { account: true } });
  }

  async getUser(where: FindOptionsWhere<User>): Promise<User> {
    return this.userRepository.findOneBy(where);
  }

  async addUser(dto: AddUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save({
      name: dto.name,
      password: hashedPassword,
    });
    await this.accountService.addAccount({ userId: user.id, initialBalance: 0 });
    return user;
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);
  }
}
