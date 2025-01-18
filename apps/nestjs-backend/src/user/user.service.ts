import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
      ) {}
    
      async createUser(username: string, password: string, email: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
          username,
          password: hashedPassword,
          email,
        });
        return this.userRepository.save(newUser);
      }
    
      async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
      }
}
