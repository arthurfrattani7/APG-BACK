import { Module } from '@nestjs/common';
import { PrismaService } from './providers/db/prisma.Service';
import { UserRepository } from './repositories/user.repository';
import { MapperRepository } from './mapper/entityMapper';
import { PostRepository } from './repositories/posts.repository';
import { CategoryRepository } from './repositories/categories.repository';
import { CommentRepository } from './repositories/comments.repository';
import { MailProvider } from './providers/mailServices/emailTransporter';
import { CoursesRepository } from './repositories/courses.repository';
@Module({
  providers: [PrismaService, UserRepository, PostRepository, MapperRepository, CategoryRepository, CommentRepository, MailProvider, CoursesRepository],
  exports: [UserRepository, PostRepository, PrismaService, MapperRepository, CategoryRepository, CommentRepository, MailProvider, CoursesRepository],
})
export class DataModule {}
