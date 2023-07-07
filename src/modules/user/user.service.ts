import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../../schemas/user/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/User.dto';
import { USER_PROVIDER } from '../../consts/database';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_PROVIDER)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUser: UserDto) {
    try {
      return await this.usersRepository.create(createUser);
    } catch (err) {
      return new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUser(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
