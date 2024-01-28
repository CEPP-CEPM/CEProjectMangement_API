import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/CreatePost.dto';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    async findAllPost(): Promise<CreatePostDto[]> {
        return await this.postRepository.find()
    }
}
