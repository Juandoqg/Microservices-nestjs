import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'findUser' })
  findOne(id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'createUser' })
  createUser(data: any) {
    console.log('Petición recibida en user-service:', data);
    return this.userService.create(data);
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(data: { id: number; user: any }) {
    return this.userService.update(data.id, data.user);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  delete(id: number) {
    return this.userService.delete(id);
  }

  @MessagePattern({ cmd: 'findUserByUsername' })
  findUserByUsername(username: string) {
    return this.userService.findByUsername(username);
  }
}
