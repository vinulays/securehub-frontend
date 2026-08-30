import { z } from 'zod';

import { OrganizationRole } from '@/constants/roles';

export const inviteUserSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.email('Enter a valid email address'),
  organizationId: z.uuid('Organization is required'),
  organizationRole: z.enum([OrganizationRole.ADMIN, OrganizationRole.MEMBER]),
});

export const acceptInvitationSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be between 8 and 12 characters')
      .max(12, 'Password must be between 8 and 12 characters')
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, 'Include an uppercase letter, number, and special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type InviteUserFormValues = z.infer<typeof inviteUserSchema>;
export type AcceptInvitationFormValues = z.infer<typeof acceptInvitationSchema>;
