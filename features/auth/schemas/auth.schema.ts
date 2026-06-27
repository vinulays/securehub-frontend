import { z } from 'zod';

const usernameSchema = z.string().min(3).max(20).regex(/^\w+$/);

const emailSchema = z.email();

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username or email is required')
    .refine((value) => usernameSchema.safeParse(value).success || emailSchema.safeParse(value).success, {
      message: 'Enter a valid username (3-20 characters, letters, numbers, underscores) or a valid email address.',
    }),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
