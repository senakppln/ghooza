import type { JwtConfig } from '../jwt'
import type { ConfigSchema } from './config.schema'

export interface ConfigTypes {
  jwt: JwtConfig
}

export type Config = ConfigSchema & ConfigTypes
