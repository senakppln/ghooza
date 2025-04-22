import { z } from 'zod'

export const environmentSchema = z.object({
  DATABASE_URL: z.string(),

  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRATION: z.string().default('1w'),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRATION: z.string().default('1y'),
})

export type EnvironmentSchema = z.infer<typeof environmentSchema>
