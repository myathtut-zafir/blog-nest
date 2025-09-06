import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './CreatePost.dto';
import { UpdatePostDto } from './update-post.dto';

export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, authorId: number) {
    const post = new Post();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.slug = createPostDto.slug;
    post.published = createPostDto.published || false;
    post.featuredImage = createPostDto.featuredImage || null;
    post.authorId = authorId;

    return this.postRepository.save(post);
  }

  async updateSimple(id: number, updatePostDto: UpdatePostDto) {
    // No ownership check needed - guard handles it
    await this.postRepository.update(id, updatePostDto);

    // Return the updated post with author relation
    const updatedPost = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return updatedPost;

    // return plainToClass(PostDetailDto, updatedPost, {
    //   excludeExtraneousValues: true,
    // });
  }
}
