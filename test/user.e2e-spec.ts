import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('User Creation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      })
      .expect(201);
  });
});
