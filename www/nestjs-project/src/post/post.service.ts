import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostService {
    constructor(
      @InjectRepository(Post)
      private postRepository: Repository<Post>,
    ) {}
    
    findAll(): Promise<Post[]> {
      return this.postRepository.find();
    }
    
    findOne(id: string): Promise<Post> {
      return this.postRepository.findOne(id);
    }

    async create(postData: CreatePostDto): Promise<Post> {
      let post = new Post();
      post.title = postData.title;
      post.content = postData.content;
      post.author = postData.author;
      post.isViewable = postData.isViewable;
  
      const nesPost = await this.postRepository.save(post);
  
      return nesPost;
    }

    async update(id: string, postData: any): Promise<Post> {
      let toUpdate = await this.postRepository.findOne(id);
      let updated = Object.assign(toUpdate, postData);
      const post = await this.postRepository.save(updated);
      return post;
    }
    
    async remove(id: string): Promise<void> {
      await this.postRepository.delete(id);
    }
}
