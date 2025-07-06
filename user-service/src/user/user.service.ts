import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users = [{ id: 1, username: 'test', password: '$2b$10$....' }]; // Hasheada

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(u => u.id === id);
  }

  async create(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: hashedPassword };
  this.users.push(newUser);
  return newUser;
}
  update(id: number, userData) {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, userData);
      return user;
    }
    return null;
  }

  delete(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    return { message: 'User deleted' };
  }

  findByUsername(username: string) {
  const user = this.users.find(user => user.username === username);
  return user || null;  
  }

}
