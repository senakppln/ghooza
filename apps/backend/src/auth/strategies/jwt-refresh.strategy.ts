import type { ConfigService } from '@nestjs/config'
import type { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Config } from 'src/config'
import { UserPayload } from '../types'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService<Config, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => JwtRefreshStrategy.fromCookie(req),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    })
  }

  public static fromCookie(req: Request) {
    return req.cookies.refreshToken ?? null
  }

  async validate(payload: UserPayload) {
    return payload
  }
}
