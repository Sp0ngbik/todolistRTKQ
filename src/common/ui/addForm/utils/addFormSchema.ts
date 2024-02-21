import { z } from 'zod'

export type AddTask = z.infer<typeof addFormSchema>

export const addFormSchema = z.object({
  title: z.string().trim().min(1).max(30),
})
