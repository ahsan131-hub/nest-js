
import { z } from 'zod';

export const createUserSchema = z
    .object({
        name: z.string(),
        age: z.number(),
        phoneNumber: z.string(),
        email:z.string()
    })
    .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;