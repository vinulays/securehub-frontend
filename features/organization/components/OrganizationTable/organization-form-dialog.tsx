'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormField from '@/components/common/form-field';
import TextareaFormField from '@/components/common/textarea-form-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldError } from '@/components/ui/field';
import { getErrorMessage } from '@/lib/error-handler';

import { useOrganizationMutations } from '../../hooks/use-organization-mutations';
import {
  type CreateOrganizationFormValues,
  createOrganizationSchema,
  type UpdateOrganizationFormValues,
  updateOrganizationSchema,
} from '../../schemas/organization.schema';
import type { Organization } from '../../types/organization.types';

interface OrganizationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization?: Organization;
}

export function OrganizationFormDialog({ open, onOpenChange, organization }: OrganizationFormDialogProps) {
  const isEditing = Boolean(organization);

  const { createMutation, updateMutation } = useOrganizationMutations();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const { control, handleSubmit, formState, reset, setError, clearErrors } = useForm<
    CreateOrganizationFormValues | UpdateOrganizationFormValues
  >({
    resolver: zodResolver(isEditing ? updateOrganizationSchema : createOrganizationSchema),
    defaultValues: { name: '', slug: '', description: '' },
  });

  useEffect(() => {
    reset({
      name: organization?.name ?? '',
      slug: organization?.slug ?? '',
      description: organization?.description ?? '',
    });
  }, [organization, open, reset]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isPending) onOpenChange(nextOpen);
  };

  const onSubmit = async (values: CreateOrganizationFormValues | UpdateOrganizationFormValues) => {
    clearErrors('root');

    try {
      if (organization) {
        await updateMutation.mutateAsync({
          id: organization.id,
          request: { name: values.name, description: values.description },
        });
      } else {
        await createMutation.mutateAsync(values as CreateOrganizationFormValues);
      }

      onOpenChange(false);
    } catch (error) {
      setError('root', { type: 'server', message: getErrorMessage(error) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending} className="min-w-0">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Organization' : 'Add Organization'}</DialogTitle>

          <DialogDescription className="break-words">
            {isEditing ? 'Update the organization details.' : 'Enter the details for the new organization.'}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={control}
            label="Name"
            placeholder="Organization name"
            required
            disabled={isPending}
          />

          {!isEditing && (
            <FormField
              name="slug"
              control={control}
              label="Slug"
              placeholder="organization-slug"
              required
              disabled={isPending}
            />
          )}

          <TextareaFormField
            name="description"
            control={control}
            label="Description"
            placeholder="Organization description"
            maxLength={2000}
            disabled={isPending}
          />

          {formState.errors.root?.message && (
            <FieldError className="break-words" errors={[{ message: formState.errors.root.message }]} />
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}

              {isEditing ? 'Save Changes' : 'Create Organization'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
