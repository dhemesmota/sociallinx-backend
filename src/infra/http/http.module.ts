import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/feed/application/use-cases/authenticate-user'
import { CreatePostUseCase } from '@/domain/feed/application/use-cases/create-post'
import { EditAccountUseCase } from '@/domain/feed/application/use-cases/edit-account'
import { FetchPostsUseCase } from '@/domain/feed/application/use-cases/fetch-posts'
import { GetPostUseCase } from '@/domain/feed/application/use-cases/get-post'
import { GetUserUseCase } from '@/domain/feed/application/use-cases/get-user'
import { PublishPostUseCase } from '@/domain/feed/application/use-cases/publish-post'
import { RegisterUserUseCase } from '@/domain/feed/application/use-cases/register-user'
import { ReprovePostUseCase } from '@/domain/feed/application/use-cases/reprove-post'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreatePostController } from './controllers/create-post.controller'
import { EditAccountController } from './controllers/edit-account.controller'
import { FetchPostsController } from './controllers/fetch-posts.controller'
import { GetUserController } from './controllers/get-account.controller'
import { PublishPostController } from './controllers/publish-post.controller'
import { ReprovePostController } from './controllers/reprove-post.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    GetUserController,
    FetchPostsController,
    PublishPostController,
    ReprovePostController,
    EditAccountController,
    CreatePostController,
  ],
  providers: [
    AuthenticateUserUseCase,
    GetUserUseCase,
    CreatePostUseCase,
    FetchPostsUseCase,
    PublishPostUseCase,
    ReprovePostUseCase,
    GetPostUseCase,
    EditAccountUseCase,
    RegisterUserUseCase,
  ],
})
export class HttpModule {}
