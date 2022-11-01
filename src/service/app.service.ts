import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async singup(email: string, password: string): Promise<User> {
    const user = await this._userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('email exists');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = await hash(password, 10);

    this._userRepository.save(newUser);

    return newUser;
  }
}
