import { z } from 'zod'

export type LoginSchema = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1),
  rememberMe: z.boolean().default(false),
})
