import type { JwtConfig } from './type'
import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs(
  'jwt',
  (): JwtConfig => ({
    accessToken: {
      secret: env.JWT_SECRET,
      expiration: env.JWT_EXPIRES_IN,
    },
    refreshToken: {
      secret: env.JWT_REFRESH_SECRET,
      expiration: env.JWT_REFRESH_EXPIRES_IN,
    },
  }),
)
