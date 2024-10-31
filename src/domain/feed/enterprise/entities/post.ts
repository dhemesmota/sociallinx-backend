import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { PostStatus } from '@prisma/client'

export interface PostProps {
  authorId?: UniqueEntityID | null
  content?: string | null
  title?: string | null
  status?: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Post extends AggregateRoot<PostProps> {
  get authorId() {
    return this.props.authorId as UniqueEntityID
  }

  set authorId(authorId: UniqueEntityID) {
    this.props.authorId = authorId
  }

  get content() {
    return this.props.content
  }

  get title() {
    return this.props.title
  }

  get status() {
    return this.props.status as PostStatus
  }

  set status(status: string) {
    this.props.status = status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<PostProps, 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID,
  ) {
    const post = new Post(
      {
        ...props,
        status: props.status ?? PostStatus.DRAFT,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return post
  }
}
