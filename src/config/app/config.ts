import { env } from 'node:process'
import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
  DATABASE_URL: env.DATABASE_URL,
  REDIS_URL: env.REDIS_URL,
}))
