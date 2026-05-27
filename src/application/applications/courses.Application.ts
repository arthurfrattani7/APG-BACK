import { Injectable } from "@nestjs/common";
import { CoursesDomain } from "domain/services/courses.domain";
import { CourseResponseDto } from "presentation/dto/response/courseResponse.dto";

@Injectable()
export class CoursesApplication {
  constructor(private readonly courses: CoursesDomain) {}

  async getAllCourses(): Promise<CourseResponseDto[]> {
    return await this.courses.getAllCourses();
  }

  async getCourseById(id: string): Promise<CourseResponseDto> {
    return await this.courses.getCourseById(id);
  }
}
