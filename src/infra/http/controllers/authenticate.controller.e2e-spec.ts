import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { CuratorFactory } from 'test/factories/make-curator'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let curatorFactory: CuratorFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CuratorFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    curatorFactory = moduleRef.get(CuratorFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await curatorFactory.makePrismaCurator({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
