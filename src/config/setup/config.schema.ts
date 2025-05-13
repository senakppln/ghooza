import type { z } from 'zod'
import { appSchema } from '../app'
import { jwtSchema } from '../jwt'

export const configSchema = appSchema.merge(jwtSchema)

export type ConfigSchema = z.infer<typeof configSchema>
