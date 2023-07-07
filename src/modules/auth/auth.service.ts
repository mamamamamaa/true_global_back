import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '../user/dto/User.dto';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly salt: string;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.salt = this.configService.get('BCRYPT_SALT');
  }

  async signIn(@Body() { email, password }: UserDto) {
    const user = await this.userService.findUser(email);

    if (!user) throw new UnauthorizedException();

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      throw new HttpException('Invalid email or password', HttpStatus.CONFLICT);

    const { id } = user;

    const payload = { id };

    const accessToken = await this.jwtService.signAsync(payload);

    await this.userService.setAccessToken(id, accessToken);

    return { email, accessToken };
  }
}
