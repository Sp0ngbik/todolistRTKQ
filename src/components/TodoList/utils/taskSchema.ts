import { z } from 'zod'

export type AddTask = z.infer<typeof addNewTask>

export const addNewTask = z.object({
  taskName: z.string().trim().min(1).max(30),
})
