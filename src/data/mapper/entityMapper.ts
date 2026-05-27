import { Injectable } from "@nestjs/common";
import { UserEntity } from "data/entities/user.Entity";
import { ICourseFromDb, IToUserEntity } from "./interface";
import { PostEntity } from "data/entities/post.Entity";
import { posts, categories } from "@prisma/client";
import { CategoryEntity } from "data/entities/categories.Entity";
import { CourseEntity } from "data/entities/course.Entity";

@Injectable()
export class MapperRepository {
  /**
   * Converte o modelo do Prisma (BD) para a Entidade de Domínio.
   */
  toUserEntity(dto: IToUserEntity | null): UserEntity | null {
    if (!dto) return null;

    const user = new UserEntity();
    user.id = dto.id;
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    user.type = dto.type as "leitor" | "autor" | "admin";
    user.data_criacao = dto.data_criacao;
    user.isVerified = dto.isVerified;
    user.verificationCodeHash = dto.verificationCodeHash;
    user.verificationExpiredAt = dto.verificationExpiredAt;

    return user;
  }

  post(postDb: posts): PostEntity {
    if (!postDb) return null;
    return {
      id: postDb.id,
      title: postDb.title,
      content: postDb.content,
      publicationDate: postDb.publication_date,
      authorId: postDb.authorId,
      categorieId: postDb.categorieId,
      imageUrl: postDb.imageUrl,
    };
  }

  toCategoryEntity(dto: categories | null): CategoryEntity | null {
    if (!dto) return null;

    const category = new CategoryEntity();
    category.id = dto.id;
    category.name = dto.name;

    return category;
  }

 course(course: ICourseFromDb | null): CourseEntity | null {
    if (!course) return null;

    const courseEntity = new CourseEntity();
    courseEntity.id = course.id;
    courseEntity.title = course.title;
    courseEntity.bgClass = course.bgClass;
    courseEntity.description = course.description;
    courseEntity.duration = course.duration;
    courseEntity.modules = course.modules;
    courseEntity.level = course.level;
    courseEntity.hotmartLink = course.hotmartLink;

    // 100% Tipado: O compilador sabe que 'b' é do tipo ICourseBenefitFromDb
    courseEntity.benefits = course.benefits
      ? course.benefits.map((b) => b.text)
      : [];

    return courseEntity;
  }
}
