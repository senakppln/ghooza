import type { EnvironmentSchema } from '../schema'

export interface JwtConfig {
  accessToken: {
    secret: string
    expiration: string
  }
  refreshToken: {
    secret: string
    expiration: string
  }
}

export interface ConfigPartials {
  jwt: JwtConfig
}

export type Config = EnvironmentSchema & ConfigPartials
