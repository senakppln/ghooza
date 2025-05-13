import type { ConfigFactory } from '@nestjs/config'
import type { ConfigTypes } from './config.type'
import jwtConfig from '../jwt/jwt.config'

export const loads: ConfigFactory<ConfigTypes[keyof ConfigTypes]>[] = [
  jwtConfig,
]
