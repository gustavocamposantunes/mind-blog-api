import { Post } from '@/domain/entities/post.entity';
import { CreatePostDto } from '@/presentation/dtos/create-post.dto';
import { ListPostsResponseDto } from '@/presentation/dtos/list-posts.response.dto';
import { faker } from '@faker-js/faker/.';

export const postData: CreatePostDto = {
  author_id: faker.number.int(),
  title: faker.commerce.productName(),
  content: faker.lorem.paragraphs(3),
};

export const expectedPost: Post = {
  title: postData.title,
  content: postData.content,
  author_id: postData.author_id,
  author: {
    id: 1,
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
    posts: [],
  },
  id: 2,
  publishedAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
};

export const postsList: ListPostsResponseDto = {
  posts: [expectedPost],
  total: 1,
  limit: 10,
  page: 1,
};

export const mockRequest = {
  user: {
    userId: expectedPost.author_id,
  },
};
