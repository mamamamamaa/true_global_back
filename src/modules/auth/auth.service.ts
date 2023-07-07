import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/User.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly salt: string;
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.salt = this.configService.get('BCRYPT_SALT');
  }

  async signIn({ email, password }: UserDto) {
    const user = await this.userService.findUser(email);

    if (!user)
      throw new HttpException('Invalid email or password', HttpStatus.CONFLICT);

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      throw new HttpException('Invalid email or password', HttpStatus.CONFLICT);

    const { id } = user;

    const accessToken = await this.generateAccessToken(id);

    await this.userService.setAccessToken(id, accessToken);

    return { email, accessToken };
  }

  async signUp({ email, password }: UserDto) {
    const user = await this.userService.findUser(email);

    if (user) throw new HttpException('Email in use', HttpStatus.CONFLICT);

    const hashPassword = await bcrypt.hash(password, this.salt);

    const { id } = await this.userService.createUser({
      email,
      password: hashPassword,
    });

    const accessToken = await this.generateAccessToken(id);

    await this.userService.setAccessToken(id, accessToken);

    return { email, accessToken };
  }

  async getAll() {
    return this.userService.getAll();
  }

  private generateAccessToken(id: number) {
    const payload = { id };
    return this.jwtService.signAsync(payload);
  }
}
