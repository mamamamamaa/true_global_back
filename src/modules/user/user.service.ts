import { Injectable } from '@nestjs/common';
import { User } from '../../schemas/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/User.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
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

  setAccessToken(id: number, accessToken: string) {
    return this.usersRepository.update(id, { accessToken });
  }
}
