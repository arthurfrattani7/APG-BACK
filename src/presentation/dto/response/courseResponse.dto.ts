import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({ 
    example: '8f3b2a1a-4c5d-4e6f-8a7b-9c0d1e2f3a4b', 
    description: 'ID único do curso (UUID gerado pelo banco)' 
  })
  id: string;

  @ApiProperty({ 
    example: 'Curso Completo de Direito Administrativo', 
    description: 'Título principal do curso' 
  })
  title: string;

  @ApiProperty({ 
    example: 'bg-blue-600', 
    description: 'Classe CSS utilizada no front-end para renderizar a cor de fundo do card' 
  })
  bgClass: string;

  @ApiProperty({ 
    example: 'Domine todos os conceitos de atos administrativos, licitações e contratos públicos focados para concursos.', 
    description: 'Descrição detalhada e ementa resumida do curso' 
  })
  description: string;

  @ApiProperty({ 
    example: '60 horas', 
    description: 'Duração total estimada ou carga horária do curso' 
  })
  duration: string;

  @ApiProperty({ 
    example: 12, 
    description: 'Quantidade total de módulos contidos no curso' 
  })
  modules: number;

  @ApiProperty({ 
    example: 'Intermediário', 
    description: 'Nível de nivelamento ou pré-requisito sugerido para o aluno' 
  })
  level: string;

  @ApiProperty({
    example: ['Acesso vitalício', 'Aulas em áudio e PDF', 'Simulados com questões comentadas'],
    description: 'Lista com as principais vantagens e benefícios do curso',
    type: [String]
  })
  benefits: string[];

  @ApiProperty({ 
    example: 'https://pay.hotmart.com/ABC12345X', 
    description: 'Link direto externo para a página de vendas ou checkout da Hotmart' 
  })
  hotmartLink: string;
}