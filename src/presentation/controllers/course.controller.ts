import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { CoursesApplication } from "application/applications/courses.Application";
import { CourseResponseDto } from "presentation/dto/response/courseResponse.dto";
import { Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
@ApiBearerAuth()
@ApiTags("Courses")
@Controller("courses")
export class CourseController {
  constructor(private readonly courseApplication: CoursesApplication) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os cursos cadastrados' })
  @ApiResponse({ status: 200, description: 'Lista de cursos retornada com sucesso.', type: [CourseResponseDto] })
  async findAll(): Promise<CourseResponseDto[]> {
    return this.courseApplication.getAllCourses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um curso específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Curso encontrado com sucesso.', type: CourseResponseDto })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  async findById(@Param('id') id: string): Promise<CourseResponseDto> {
    return this.courseApplication.getCourseById(id);
  }
}