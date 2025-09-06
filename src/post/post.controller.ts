import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './CreatePost.dto';
import { JwtAuthGuard } from 'src/iam/jwt-auth.guard';
import { JwtPayload } from 'src/iam/jwt-payload.interface';
import { PostOwnerGuard } from './guard/post-owner.guard';
import { UpdatePostDto } from './update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.postService.create(createPostDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updateSimple(id, updatePostDto);
  }
}
