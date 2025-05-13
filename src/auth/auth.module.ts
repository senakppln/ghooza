import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { Config, JwtConfig } from 'src/config'
import { UserService } from 'src/user'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<Config, true>,
      ) => {
        const jwtConfig = configService.get<JwtConfig>('jwt')
        return {
          secret: jwtConfig.accessToken.secret,
          signOptions: { expiresIn: jwtConfig.accessToken.expiration },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, ConfigService, {
    provide: APP_GUARD,
    useValue: undefined,
  }],

  exports: [AuthService],
})
export class AuthModule {}
