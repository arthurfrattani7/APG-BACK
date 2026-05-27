import { Injectable } from "@nestjs/common";
import { CourseEntity } from "data/entities/course.Entity";
import { CoursesRepository } from "data/repositories/courses.repository";

@Injectable()
export class CoursesDomain {
  constructor(
    private readonly coursesRepository: CoursesRepository,
  ) {}

  async getAllCourses(): Promise<CourseEntity[]> {
    return await this.coursesRepository.findAll();
  }

  async getCourseById(id: string): Promise<CourseEntity> {
    return await this.coursesRepository.findById(id);
  }
}