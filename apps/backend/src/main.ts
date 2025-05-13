import type { Config } from './config'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService<Config, true>)

  app.use(cookieParser())
  await app.listen(configService.get('PORT'))
}
void bootstrap()
