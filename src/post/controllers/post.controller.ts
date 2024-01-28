import { Controller, Get } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/CreatePost.dto';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}

    @Get()
    async getAllPost():Promise<CreatePostDto[]> {
        return await this.postService.findAllPost()
    }
}
