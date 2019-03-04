import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [ AppModule ]
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/api/v1/ (GET)', () => {
		return request(app.getHttpServer()).get('/api/v1/').expect(500);
	});
});
