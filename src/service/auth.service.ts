import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _tokenService: TokenService,

    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async signup(args: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const { email, password } = args;
    const user = await this._userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('email exists');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = await hash(password, 10);

    this._userRepository.save(newUser);

    const token = this._tokenService.generate({ userId: newUser.id });

    return { token };
  }

  async login(args: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const { email, password } = args;
    const user = await this._userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('email password error');
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new BadRequestException('email password error');
    }

    const token = this._tokenService.generate({ userId: user.id });

    return { token };
  }
}
