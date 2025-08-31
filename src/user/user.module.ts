import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashingService } from 'src/iam/hashing.service';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserService,
  ],
})
export class UserModule {}
