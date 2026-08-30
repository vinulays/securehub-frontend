'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import FormField from '@/components/common/form-field';
import { Button, buttonVariants } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { ROUTES } from '@/constants/routes';
import { getErrorMessage } from '@/lib/error-handler';
import { cn } from '@/lib/utils';

import { useAcceptInvitation, useInvitationValidation } from '../hooks';
import { type AcceptInvitationFormValues, acceptInvitationSchema } from '../schemas';

interface InvitationActivationFormProps {
  token: string;
}

export function InvitationActivationForm({ token }: InvitationActivationFormProps) {
  const router = useRouter();
  const { data: invitation, error: validationError, isLoading } = useInvitationValidation(token);
  const acceptInvitationMutation = useAcceptInvitation();

  const { control, handleSubmit, formState, setError, clearErrors } = useForm<AcceptInvitationFormValues>({
    resolver: zodResolver(acceptInvitationSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async ({ password }: AcceptInvitationFormValues) => {
    clearErrors('root');

    try {
      await acceptInvitationMutation.mutateAsync({ token, password });

      router.replace(ROUTES.AUTH.LOGIN);
    } catch (error) {
      setError('root', { type: 'server', message: getErrorMessage(error) });
    }
  };

  if (!token) {
    return <InvitationUnavailable message="The invitation link is missing its token." />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <LoaderCircleIcon className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Checking your invitation</p>
      </div>
    );
  }

  if (validationError || !invitation?.valid) {
    return (
      <InvitationUnavailable
        message={validationError ? getErrorMessage(validationError) : 'This invitation is invalid.'}
      />
    );
  }

  const isPending = acceptInvitationMutation.isPending;

  return (
    <form className={cn('flex flex-col gap-6')} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome to SecureHub, {invitation.firstName}!</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Create a password to activate the account for {invitation.email}.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <FormField
          name="password"
          control={control}
          label="Password"
          type="password"
          required
          disabled={isPending}
          autoComplete="new-password"
          showPasswordToggle
        />
        <FormField
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          required
          disabled={isPending}
          autoComplete="new-password"
          showPasswordToggle
        />

        {formState.errors.root?.message && <FieldError errors={[{ message: formState.errors.root.message }]} />}
      </div>

      <Field>
        <Button type="submit" disabled={isPending} className="flex w-full items-center justify-center" size="lg">
          {isPending && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
          Activate Account
        </Button>
      </Field>
    </form>
  );
}

function InvitationUnavailable({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Invitation unavailable</h1>
        <p className="text-sm text-balance text-muted-foreground">{message}</p>
      </div>

      <Link href={ROUTES.AUTH.LOGIN} className={buttonVariants({ variant: 'default' })}>
        Go to login
      </Link>
    </div>
  );
}
