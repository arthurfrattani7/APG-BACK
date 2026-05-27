import { Injectable } from "@nestjs/common";
import { MapperRepository } from "data/mapper/entityMapper";
import { PrismaService } from "../providers/db/prisma.Service";
import { CourseEntity } from "data/entities/course.Entity";

@Injectable()
export class CoursesRepository {
  constructor(
    private readonly mapper: MapperRepository,
    private readonly db: PrismaService,
  ) {}

  async findAll(): Promise<CourseEntity[]> {
    const coursesDb = await this.db.course.findMany({
      include: { benefits: true },
      orderBy: { title: "asc" },
    });
    return coursesDb.map((c) => this.mapper.course(c));
  }

  async findById(id: string): Promise<CourseEntity> {
    const courseDb = await this.db.course.findUnique({
      where: { id },
      include: { benefits: true },
    });
    return this.mapper.course(courseDb);
  }
}
