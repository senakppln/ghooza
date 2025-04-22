import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { response } from 'express'
import ms, { StringValue } from 'ms'
import { Config, JwtConfig } from 'src/config/types'
import { PrismaService } from 'src/database'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UserService, private readonly jwt: JwtService, private readonly config: ConfigService<Config, true>,

  ) {}

  async validateUser(phone: string, password: string) {
    const user = await this.userService.findOne(phone, password)

    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async loginWithCredentials(pass: string, phone: string) {
    const user = await this.validateUser(phone, pass)
    if (!user) {
      return null
    }
    const payload = { username: user.phone, sub: user.id }
    const accessToken = await this.jwt.signAsync(payload)

    const jwtConfig = this.config.get<JwtConfig>('jwt')

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtConfig.accessToken.expiration as StringValue),
    })
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: jwtConfig.refreshToken.secret,
      expiresIn: jwtConfig.refreshToken.expiration,
    })

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: ms(jwtConfig.refreshToken.expiration as StringValue),
    })
  }
}
