import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(
    @Request()
    req: {
      user: {
        userId: number;
        email: string;
      };
    },
  ) {
    const userPayload = req.user;
    return this.userService.getProfile(userPayload.userId);
  }
}
