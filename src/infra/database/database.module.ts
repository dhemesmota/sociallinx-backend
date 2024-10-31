import { PostsRepository } from '@/domain/feed/application/repositories/posts-repository'
import { UserRepository } from '@/domain/feed/application/repositories/user-repository'
import { Module } from '@nestjs/common'
import { CacheModule } from '../cache/cache.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaPostsRepository } from './prisma/repositories/prisma-posts-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: PostsRepository,
      useClass: PrismaPostsRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository, PostsRepository],
})
export class DatabaseModule {}
