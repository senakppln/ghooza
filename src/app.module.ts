import { RedisModule } from '@nestjs-modules/ioredis'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule, JwtAuthGuard } from './auth'
import { Config, validate } from './config'
import { loads } from './config/setup/loads'
import { DatabaseModule } from './database'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: loads,
      validate,
      cache: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Config, true>) => ({
        type: 'single',
        url: configService.get<string>('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
