import { Injectable } from '@nestjs/common';
import { User } from '../../schemas/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProperties } from '../../types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  createUser(createUser: UserDto) {
    return this.usersRepository.save(createUser);
  }

  findUser(property: UserProperties) {
    return this.usersRepository.findOneBy(property);
  }

  async updateProperty(id: number, properties: UserProperties) {
    const userToUpdate = await this.usersRepository.findOneBy({ id });

    for (const key in properties) userToUpdate[key] = properties[key];

    return this.usersRepository.save(userToUpdate);
  }
}
