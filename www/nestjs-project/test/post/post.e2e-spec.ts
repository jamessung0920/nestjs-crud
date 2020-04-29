import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PostModule } from '../../src/post/post.module';
import { PostService } from '../../src/post/post.service';
import { Post } from '../../src/post/post.entity';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('Post (e2e)', () => {
  let app: INestApplication;
  let testData = [
    { title: 'test-title', content: 'abc', author: 'james', isViewable: true},
    { title: 'test-title2', content: 'abcabc', author: 'james', isViewable: false}
  ]
  let deletedMessage = { message: 'success'}
  let postService = { 
    findAll: () => testData,
    findOne: () => testData[0],
    create: () => testData[0],
    update: () => testData[1],
    remove: () => deletedMessage
   };
  let postRepository: Repository<Post>;
  var postData: Post[];

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
          PostModule,
          TypeOrmModule.forRoot(),
      ],
    })
      .overrideProvider(PostService)
      .useValue(postService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    postRepository = moduleRef.get('PostRepository');
    postData = await postRepository.save(testData);
  });

  it(`/GET posts`, async () => {

    return request(app.getHttpServer())
      .get('/posts')
      .expect(HttpStatus.OK)
      .expect(
         postService.findAll(),
      );
  });

  it(`/GET posts/:id`, async () => {

    return request(app.getHttpServer())
      .get(`/posts/${postData[0].id}`)
      .expect(HttpStatus.OK)
      .expect(
         postService.findOne(),
      );
  });

  it(`/POST posts`, async () => {

    return request(app.getHttpServer())
      .post(`/posts`)
      .expect(HttpStatus.CREATED)
      .expect(
         postService.create(),
      );
  });

  it(`/PUT posts/:id`, async () => {

    return request(app.getHttpServer())
      .put(`/posts/${postData[0].id}`)
      .expect(HttpStatus.OK)
      .expect(
         postService.update(),
      );
  });

  it(`/DELETE posts/:id`, async () => {

    return request(app.getHttpServer())
      .delete(`/posts/${postData[0].id}`)
      .expect(HttpStatus.OK)
      .expect(
        postService.remove()
      );
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await postRepository.query(`DELETE FROM posts;`);
  });
});