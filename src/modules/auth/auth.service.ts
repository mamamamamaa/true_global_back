import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly salt: number;
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.salt = +this.configService.get<number>('BCRYPT_SALT');
  }

  async signIn({ email, password }: UserDto) {
    const user = await this.userService.findUser({ email });

    if (!user)
      throw new HttpException('Invalid email or password', HttpStatus.CONFLICT);

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      throw new HttpException('Invalid email or password', HttpStatus.CONFLICT);

    const { id } = user;

    const access_token = await this.jwtService.signAsync({ id });

    await this.userService.updateProperty(id, { access_token });

    return { email, access_token };
  }

  async signUp({ email, password }: UserDto) {
    const user = await this.userService.findUser({ email });

    if (user) throw new HttpException('Email in use', HttpStatus.CONFLICT);
    const hashPassword = await bcrypt.hash(password, this.salt);

    const { id } = await this.userService.createUser({
      email,
      password: hashPassword,
    });

    const access_token = await this.jwtService.signAsync({ id });

    await this.userService.updateProperty(id, { access_token });

    return { email, access_token };
  }

  async logout(userId: number) {
    await this.userService.updateProperty(userId, { access_token: null });

    return true;
  }
}
