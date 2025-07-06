import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, @Inject('USER_SERVICE') private userClient: ClientProxy) {}

  async validateUser(user: any, password: string): Promise<any> {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async createUser(user: any) {
    return await firstValueFrom(this.userClient.send({ cmd: 'createUser' }, user));
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginHttp(username: string, password: string) {
  const user = await firstValueFrom(
    this.userClient.send({ cmd: 'findUserByUsername' }, username)
  );

  if (!user) {
    throw new Error('User not found');
  }

  const validUser = await this.validateUser(user, password);
  if (!validUser) {
    throw new Error('Invalid password');
  }

  return this.login(user);
}
}



