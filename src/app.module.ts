import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controller/app.controller';
import { User } from './entity/user.entity';
import { AppService } from './service/app.service';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      logging: true,
      entities: [User],
      keepConnectionAlive: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, TokenService, UserService],
})
export class AppModule {}
