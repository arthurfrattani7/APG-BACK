import { Module } from "@nestjs/common";
import { DomainModule } from "../domain/domain.module";
import { ValidateModule } from "validate/services/validate.module";
import { UserApplication } from "./applications/user.Application";
import { PostApplication } from "./applications/posts.Application";
import { CategoryApplication } from "./applications/categories.Application";
import { CommentApplication } from "./applications/comment.Application";
import { DataModule } from "../data/data.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserApplicationMapper } from "./mapping/changePassword.mapping";
import { UploadApplication } from "./applications/upload.Application";
import { CoursesApplication } from "./applications/courses.Application";

@Module({
  imports: [
    DomainModule,
    ValidateModule,
    DataModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<number>("JWT_EXPIRES_IN") || 86400,
        },
      }),
    }),
  ],
  providers: [
    UserApplication,
    PostApplication,
    CategoryApplication,
    CommentApplication,
    UserApplicationMapper,
    UploadApplication,
    CoursesApplication,
  ],
  exports: [
    UserApplication,
    PostApplication,
    CategoryApplication,
    CommentApplication,
    JwtModule,
    UserApplicationMapper,
    UploadApplication,
    CoursesApplication,
  ],
})
export class ApplicationModule {}
