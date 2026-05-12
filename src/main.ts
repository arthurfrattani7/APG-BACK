import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const FRONTEND_URL = process.env.FRONTEND_URL;
  app.enableCors({
    origin: FRONTEND_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.useStaticAssets(path.join(process.cwd(), "uploads"), {
    prefix: "/uploads/",
  });

  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Blog API")
    .setDescription("Documentação das rotas do blog")
    .setVersion("1.0")
    .addTag("Users")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Servidor rodando em: http://localhost:${port}/api`);
}
bootstrap();
