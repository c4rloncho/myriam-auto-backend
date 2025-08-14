import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';
import { RegisterUserDto } from './dto/register-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() RegisterUserDto: RegisterUserDto) {
    return this.authService.register(RegisterUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.login(loginUserDto);

    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000, //1 hour
    });

    return {
      success: true,
      message: 'Login successful',
    };
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return {
      success: true,
      message: 'Logout successful'
    };
  }


}
