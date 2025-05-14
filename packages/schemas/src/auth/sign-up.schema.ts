import { z } from 'zod'

export const signUpSchema = z.object({
  input: z.string().email().or(z.string().regex(/^(\+90\s?)?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/)),
  name: z.string().max(20),
})

export type SignUp = z.infer<typeof signUpSchema>
