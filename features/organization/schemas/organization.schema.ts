import { z } from 'zod';

const descriptionSchema = z.string().max(2000, 'Description must not exceed 2000 characters');

export const createOrganizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: descriptionSchema,
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: descriptionSchema,
});

export type CreateOrganizationFormValues = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationFormValues = z.infer<typeof updateOrganizationSchema>;
