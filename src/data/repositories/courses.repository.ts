import { Injectable } from "@nestjs/common";
import { MapperRepository } from "data/mapper/entityMapper";
import { PrismaService } from "../providers/db/prisma.Service";
import { CourseEntity } from "data/entities/course.Entity";
import { ICourseFromDb } from "data/mapper/interface";

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

  async create(data: CourseEntity): Promise<CourseEntity> {
    const courseDb = await this.db.course.create({
      data: {
        title: data.title,
        bgClass: data.bgClass,
        description: data.description,
        duration: data.duration,
        modules: data.modules,
        level: data.level,
        hotmartLink: data.hotmartLink,
        benefits: {
          create: data.benefits.map((text) => ({ text })),
        },
      },
      include: { benefits: true },
    });
    return this.mapper.course(courseDb);
  }

  async update(
    id: string,
    data: Partial<Omit<CourseEntity, "id">>,
  ): Promise<CourseEntity> {
    const courseDb = await this.db.course.update({
      where: { id },
      data: {
        title: data.title,
        bgClass: data.bgClass,
        description: data.description,
        duration: data.duration,
        modules: data.modules,
        level: data.level,
        hotmartLink: data.hotmartLink,
        ...(data.benefits && {
          benefits: {
            deleteMany: {},
            create: data.benefits.map((text) => ({ text })),
          },
        }),
      },
      include: { benefits: true },
    });
    return this.mapper.course(courseDb);
  }

  async delete(id: string): Promise<void> {
    await this.db.course.delete({ where: { id } });
  }
}
