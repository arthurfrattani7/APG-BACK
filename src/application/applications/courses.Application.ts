import { Injectable } from "@nestjs/common";
import { ICreateCourseData, IUpdateCourseData } from "application/interfaces/ICourseData.application";
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

  async createCourse(data: ICreateCourseData): Promise<CourseResponseDto> {
    return await this.courses.createCourse(data);
  }

  async updateCourse(id: string, data: Partial<IUpdateCourseData>): Promise<CourseResponseDto> {
    return await this.courses.updateCourse(id, data);
  }

  async deleteCourse(id: string): Promise<void> {
    await this.courses.deleteCourse(id);
  }
}
