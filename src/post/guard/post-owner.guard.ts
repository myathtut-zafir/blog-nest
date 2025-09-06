import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { JwtPayload } from 'src/iam/jwt-payload.interface';

export class PostOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as {
      user: JwtPayload;
      params: { id: string };
    };
    const user = request.user;
    const postId = parseInt(request.params.id, 10);

    const post = await this.postRepository.findOne({
      where: { id: postId },
    });
    if (post && post.authorId === user.userId) {
      return true;
    }
    return false;
  }
}
