import { z } from 'zod';

export const createUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    email: z.string(),
    address: z.string(),
    organization: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      description: z.string(),
      openAiKey: z.string(),
      contactPerson: z.object({
        contactFirstName: z.string(),
        contactLastName: z.string(),
        contactPassword: z.string(),
        contactEmail: z.string(),
        contactAddress: z.string(),
      }),
    }),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
