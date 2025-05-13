import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().nullable(),
  phone: z.string().regex(/^(\+90\s?)?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/).nullable(),
  password: z.string(),
})

export type Login = z.infer<typeof loginSchema>
