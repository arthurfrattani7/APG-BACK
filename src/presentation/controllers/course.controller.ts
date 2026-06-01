import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Controller, Post, UseGuards, Param, Get, Body, Put, Delete } from "@nestjs/common";
import { CoursesApplication } from "application/applications/courses.Application";
import { CourseResponseDto } from "presentation/dto/response/courseResponse.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateCourseRequestDto } from "presentation/dto/request/course/createCurseRequestDto";
import { Roles } from "application/decorators/rolesDecorator";
import { RolesGuard } from "application/guards/roles.Guard";
import { JwtAuthGuard } from "application/guards/jwtAuth.Guard";
import { UpdatedCourseRequestDto } from "presentation/dto/request/course/updatedCurseRequestDto";
@ApiBearerAuth()
@ApiTags("Courses")
@Controller("courses")
export class CourseController {
  constructor(private readonly courseApplication: CoursesApplication) {}

  @Get()
  @ApiOperation({ summary: "Listar todos os cursos cadastrados" })
  @ApiResponse({
    status: 200,
    description: "Lista de cursos retornada com sucesso.",
    type: [CourseResponseDto],
  })
  async findAll(): Promise<CourseResponseDto[]> {
    return this.courseApplication.getAllCourses();
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter detalhes de um curso específico pelo ID" })
  @ApiResponse({
    status: 200,
    description: "Curso encontrado com sucesso.",
    type: CourseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Curso não encontrado." })
  async findById(@Param("id") id: string): Promise<CourseResponseDto> {
    return this.courseApplication.getCourseById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Criar um novo curso" })
  @ApiResponse({
    status: 201,
    description: "Curso criado com sucesso.",
    type: CourseResponseDto,
  })
  async create(
    @Body() createCourseDto: CreateCourseRequestDto,
  ): Promise<CourseResponseDto> {
    return this.courseApplication.createCourse(createCourseDto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Atualizar um curso existente" })
  @ApiResponse({
    status: 200,
    description: "Curso atualizado com sucesso.",
    type: CourseResponseDto,
  })
  @ApiResponse({ status: 404, description: "Curso não encontrado." })
  async update(
    @Param("id") id: string,
    @Body() updateCourseDto: UpdatedCourseRequestDto,
  ): Promise<CourseResponseDto> {
    return this.courseApplication.updateCourse(id, updateCourseDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Excluir um curso existente" })
  @ApiResponse({
    status: 200,
    description: "Curso excluído com sucesso.",
  })
  @ApiResponse({ status: 404, description: "Curso não encontrado." })
  async delete(@Param("id") id: string): Promise<void> {
    return this.courseApplication.deleteCourse(id);
  }
}
