import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

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
}
