import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  UseGuards,
  Delete,
  SetMetadata,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/iam/roles.decorator';
import { Role } from 'src/iam/role.enum';
import { RolesGuard } from 'src/iam/roles.guard';
import { JwtPayload } from 'src/iam/jwt-payload.interface';

@Roles(Role.USER)
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
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  remove(
    @Param('id') id: number,
    @Request()
    req: {
      user: JwtPayload;
    },
  ) {
    return this.userService.removeUser(id);
  }
}
