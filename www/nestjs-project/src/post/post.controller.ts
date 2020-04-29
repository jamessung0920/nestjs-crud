import { Controller, Get, Post as PostMethod, Put, Delete, Param, Body, Res, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';

import {
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, description: 'Return all posts.'})
  @Get()
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 200, description: 'Return specific post.'})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Post> {
    return this.postService.findOne(id);
  }

  @ApiBody({ type: [CreatePostDto] })
  @ApiResponse({ status: 201, description: 'Return created post.'})
  @PostMethod()
  create(@Body('post') postData: CreatePostDto): Promise<Post> {
    return this.postService.create(postData);
  }

  @ApiBody({ type: [CreatePostDto] })
  @ApiResponse({ status: 200, description: 'Return updated post.'})
  @Put(':id')
  update(@Param('id') id: string, @Body('post') postData: CreatePostDto): Promise<Post> {
    return this.postService.update(id, postData);
  }

  @ApiResponse({ status: 200, description: 'Return success message.'})
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.postService.remove(id);
    res.status(HttpStatus.OK).json({message: 'success'});
  }
}
