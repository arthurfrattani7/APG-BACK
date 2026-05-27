import { Module } from "@nestjs/common";
import { ApplicationModule } from "../application/application.module";
import { UserController } from "./controllers/user.controller";
import { PostController } from "./controllers/post.controller";
import { CategoryController } from "./controllers/category.controller";
import { CommentController } from "./controllers/comments.controller";
import { UploadController } from "./controllers/upload.controller";
import { CourseController } from "./controllers/course.controller";
@Module({
  imports: [ApplicationModule],
  controllers: [
    UserController,
    PostController,
    CategoryController,
    CommentController,
    UploadController,
    CourseController
  ],
})
export class PresentationModule {}
