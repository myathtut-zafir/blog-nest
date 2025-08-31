import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashingService } from 'src/iam/hashing.service';
import { BcryptService } from './bcrypt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'src/iam/jwt.config';
import { JwtStrategy } from 'src/iam/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserService,
    JwtStrategy,
  ],
})
export class UserModule {}
