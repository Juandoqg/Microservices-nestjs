import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginHttp(@Body() loginData: { username: string; password: string }) {
    return this.authService.loginHttp(loginData.username, loginData.password);
  }

  @MessagePattern({ cmd: 'login' })
  async loginMicroservice(data: { user: any; password: string }) {
    const user = await this.authService.validateUser(data.user, data.password);
    if (user) {
      return this.authService.login(user);
    }
    return { error: 'Invalid credentials' };
  }

  @Post('register')
  async register(@Body() userData: { username: string; password: string }) {
    return this.authService.createUser(userData);
  }
}
