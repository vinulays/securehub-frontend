'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import FormField from '@/components/common/form-field';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { ROUTES } from '@/constants/routes';
import { getErrorMessage } from '@/lib/error-handler';
import { cn } from '@/lib/utils';

import { useLogin } from '../../hooks/use-login';
import type { LoginFormValues } from '../../schemas/auth.schema';
import { loginSchema } from '../../schemas/auth.schema';
import { authService } from '../../services/auth-service';
import { useAuthStore } from '../../store/auth-store';

export function LoginForm() {
  const router = useRouter();

  const { login, isLoading } = useLogin();

  const { setUser } = useAuthStore.getState();

  const { control, handleSubmit, formState, setError, clearErrors } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    clearErrors('root');

    try {
      await login({
        username: data.username,
        password: data.password,
      });

      const currentUser = await authService.getCurrentUser();

      setUser(currentUser);

      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      setError('root', {
        type: 'server',
        message: getErrorMessage(error),
      });
    }
  };

  const rootErrorMessage = formState.errors.root?.message;

  return (
    <form className={cn('flex flex-col gap-6')} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back!</h1>

        <p className="text-sm text-balance text-muted-foreground">Enter your username below to login to your account</p>
      </div>

      <div className="flex flex-col gap-3">
        <FormField<LoginFormValues>
          name="username"
          control={control}
          label="Username or Email Address"
          type="text"
          required
          autoComplete="username"
        />

        <FormField<LoginFormValues>
          name="password"
          control={control}
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          showPasswordToggle
        />

        {rootErrorMessage && <FieldError errors={[{ message: rootErrorMessage }]} />}
      </div>

      <Field>
        <Button type="submit" disabled={isLoading} className="flex w-full items-center justify-center" size="lg">
          {isLoading && <LoaderCircleIcon className="h-4 w-4 animate-spin" />} Login
        </Button>
      </Field>

      <div className="text-center text-sm text-muted-foreground">
        <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="hover:underline">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}
