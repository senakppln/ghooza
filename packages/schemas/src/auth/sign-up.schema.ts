import { z } from 'zod'

export const signUpSchema = z.object({
  phone: z.string().regex(/^(\+90\s?)?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/),
  email: z.string().email().optional(),
  name: z.string().max(20),
})

export type SignUp = z.infer<typeof signUpSchema>
