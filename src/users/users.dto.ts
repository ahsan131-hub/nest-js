
import { z } from 'zod';

export const createUserSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        isActive: z.boolean(),
    })
    .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;