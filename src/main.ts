import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
require("dotenv").config();
const { PORT, HOST, SWAGGER_PREFIX } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Support API")
    .setDescription("Support API documentation")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);

  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port: ${PORT}`);

    console.log(
      `Swagger doc available at ⚠️  http://${HOST}:${PORT}/${SWAGGER_PREFIX} ⚠️`,
    );
  });
}
bootstrap();
