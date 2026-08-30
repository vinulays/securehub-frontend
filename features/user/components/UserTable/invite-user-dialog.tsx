'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import FormField from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrganizationRole, UserRole } from '@/constants/roles';
import { type Organization, useOrganizations } from '@/features/organization';
import useDebounce from '@/hooks/use-debounce';
import { getErrorMessage } from '@/lib/error-handler';

import { useUserMutations } from '../../hooks';
import { type InviteUserFormValues, inviteUserSchema } from '../../schemas';

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteUserDialog({ open, onOpenChange }: InviteUserDialogProps) {
  const { createUserMutation } = useUserMutations();
  const isPending = createUserMutation.isPending;

  const [organizationKeyword, setOrganizationKeyword] = useState<string>('');
  const debouncedOrganizationKeyword = useDebounce<string>(organizationKeyword, 500);

  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

  const organizationRequest = useMemo(
    () => ({
      keyword: debouncedOrganizationKeyword,
      page: 0,
      size: 20,
      sortBy: 'name',
      sortDirection: 'ASC',
      isActive: true,
    }),
    [debouncedOrganizationKeyword],
  );

  const { data: organizations, isLoading: isOrganizationsLoading } = useOrganizations(organizationRequest, {
    enabled: open,
  });

  const { control, handleSubmit, formState, reset, setError, clearErrors } = useForm<InviteUserFormValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      organizationId: '',
      organizationRole: OrganizationRole.MEMBER,
    },
  });

  const resetInviteForm = () => {
    reset();

    setOrganizationKeyword('');
    setSelectedOrganization(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;

    if (!nextOpen) resetInviteForm();

    onOpenChange(nextOpen);
  };

  const onSubmit = async (values: InviteUserFormValues) => {
    clearErrors('root');

    try {
      await createUserMutation.mutateAsync({ ...values, role: UserRole.USER });

      resetInviteForm();
      onOpenChange(false);
    } catch (error) {
      setError('root', { type: 'server', message: getErrorMessage(error) });
    }
  };

  let organizationOptions: React.ReactNode;

  if (isOrganizationsLoading) {
    organizationOptions = <p className="px-3 py-2 text-sm text-muted-foreground">Loading organizations...</p>;
  } else if (organizations?.content.length) {
    organizationOptions = (
      <ComboboxCollection>
        {(organization: Organization) => (
          <ComboboxItem key={organization.id} value={organization}>
            {organization.name}
          </ComboboxItem>
        )}
      </ComboboxCollection>
    );
  } else {
    organizationOptions = <p className="px-3 py-2 text-sm text-muted-foreground">No active organizations found.</p>;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={!isPending} className="min-w-0">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Send an email invitation for a user to activate their SecureHub account.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField name="firstName" control={control} label="First Name" required disabled={isPending} />
          <FormField name="lastName" control={control} label="Last Name" required disabled={isPending} />
          <FormField
            name="email"
            control={control}
            label="Email Address"
            type="email"
            autoComplete="email"
            required
            disabled={isPending}
          />

          <Controller
            name="organizationId"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="font-normal">
                  Organization<span className="text-destructive">*</span>
                </FieldLabel>

                <FieldContent>
                  <Combobox<Organization>
                    items={organizations?.content ?? []}
                    value={selectedOrganization}
                    disabled={isPending}
                    filter={null}
                    itemToStringLabel={(organization) => organization.name}
                    onInputValueChange={(value) => {
                      setOrganizationKeyword(value);
                    }}
                    onValueChange={(organization) => {
                      setSelectedOrganization(organization);
                      setOrganizationKeyword(organization?.name ?? '');

                      field.onChange(organization?.id ?? '');
                    }}
                  >
                    <ComboboxInput
                      placeholder="Search active organizations..."
                      aria-invalid={fieldState.invalid}
                      showClear={Boolean(selectedOrganization)}
                      disabled={isPending}
                    />

                    <ComboboxContent>
                      <ComboboxList>{organizationOptions}</ComboboxList>
                    </ComboboxContent>
                  </Combobox>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            name="organizationRole"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="font-normal">
                  Organization Role<span className="text-destructive">*</span>
                </FieldLabel>

                <FieldContent>
                  <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                    <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select an organization role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={OrganizationRole.MEMBER}>Member</SelectItem>
                      <SelectItem value={OrganizationRole.ADMIN}>Organization Admin</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </FieldContent>
              </Field>
            )}
          />

          {formState.errors.root?.message && (
            <FieldError className="wrap-break-word" errors={[{ message: formState.errors.root.message }]} />
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
