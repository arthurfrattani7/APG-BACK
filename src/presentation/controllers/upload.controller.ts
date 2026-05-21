import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Res,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  NotFoundException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { Response } from "express";
import { join } from "path";
import { existsSync } from "fs";
import { UploadApplication } from "application/applications/upload.Application";
import { JwtAuthGuard } from "application/guards/jwtAuth.Guard";
import { RolesGuard } from "application/guards/roles.Guard";
import { Roles } from "application/decorators/rolesDecorator";

@ApiTags("Upload")
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadApplication: UploadApplication) {}

  @Post("post")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("autor", "admin")
  @ApiOperation({ summary: "Faz o upload de uma imagem vinculada a um Post" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        postId: { type: "number", description: "ID do post" },
        file: { type: "string", format: "binary" },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async uploadPostImage(
    @Body("postId") postId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.uploadApplication.uploadPostImage(Number(postId), file);
  }

  @Put("post/:postId")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("autor", "admin")
  @ApiOperation({ summary: "Atualiza a imagem vinculada a um Post existente" })
  @ApiConsumes("multipart/form-data")
  @ApiParam({ name: "postId", type: "number", description: "ID do post" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async updatePostImage(
    @Param("postId") postId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.uploadApplication.uploadPostImage(Number(postId), file);
  }

  @Get("posts/:imageName")
  @ApiOperation({
    summary: "Visualiza uma imagem de post pelo nome do arquivo",
  })
  @ApiParam({ name: "imageName", description: "Nome do arquivo salvo" })
  getPostImage(@Param("imageName") imageName: string, @Res() res: Response) {
    const imagePath = join(process.cwd(), "uploads", "posts", imageName);

    if (!existsSync(imagePath)) {
      throw new NotFoundException("Imagem não encontrada.");
    }
    return res.sendFile(imagePath);
  }
}
