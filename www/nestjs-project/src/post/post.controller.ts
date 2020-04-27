import { Controller, Get, Post as PostMethod, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: 200, description: 'Return all posts.'})
  @Get()
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Post> {
    return this.postService.findOne(id);
  }

  @PostMethod()
  create(@Body('post') postData: CreatePostDto): Promise<Post> {
    return this.postService.create(postData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('post') postData: CreatePostDto): Promise<Post> {
    return this.postService.update(id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.postService.remove(id);
    res.status(HttpStatus.OK).json([]);
  }
}
