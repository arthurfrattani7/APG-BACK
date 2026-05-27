import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { UserDomain } from './services/user.domain';
import { UserValidate } from '../validate/services/user.Validate';
import { PostDomain } from './services/posts.domain';
import { CategoryDomain } from './services/categories.domain';
import { CommentDomain } from './services/comments.domain';
import { CoursesDomain } from './services/courses.domain';

@Module({
  imports: [DataModule], 
  providers: [UserDomain, UserValidate, PostDomain, CategoryDomain, CommentDomain, CoursesDomain],
  exports: [UserDomain, UserValidate, PostDomain, CategoryDomain, CommentDomain, CoursesDomain],
})
export class DomainModule {}