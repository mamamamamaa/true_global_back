import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { JwtPayload } from '../../types/jwt.interface';
import { User } from '../../schemas/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() dto: UserDto) {
    return this.authService.signIn(dto);
  }

  @Post('register')
  signUp(@Body() dto: UserDto) {
    return this.authService.signUp(dto);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Req() { user }: Request) {
    const { id } = user as User;
    return this.authService.logout(id);
  }

  @Get('refresh')
  @UseGuards(AuthGuard)
  refresh(@Req() { user }: Request) {
    const { email } = user as User;
    return { email };
  }
}
