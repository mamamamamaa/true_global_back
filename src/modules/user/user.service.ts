import { Inject, Injectable } from '@nestjs/common';
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

  createUser(createUser: UserDto) {
    return this.usersRepository.create(createUser);
  }

  findUser(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  getAll() {
    return this.usersRepository.find();
  }

  async setAccessToken(id: number, accessToken: string) {
    try {
      console.log('here');
      return await this.usersRepository.update(id, { accessToken });
    } catch (e) {
      console.log(e);
    }
  }
}
