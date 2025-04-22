import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Config, JwtConfig } from 'src/config/types'
import { UserService } from 'src/user/user.service'
import { JwtStrategy } from './strategies/jwt.strategy'

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
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class AuthModule {}
