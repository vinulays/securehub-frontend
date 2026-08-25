'use client';

import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';

export interface TextareaFormFieldProps<TFormValues extends FieldValues = FieldValues> extends Omit<
  React.ComponentProps<typeof Textarea>,
  'id' | 'name' | 'value' | 'defaultValue' | 'onChange'
> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  label?: React.ReactNode;
  id?: string;
  required?: boolean;
  showError?: boolean;
}

export function TextareaFormField<TFormValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  id,
  required,
  showError = true,
  className,
  ...textareaProps
}: TextareaFormFieldProps<TFormValues>) {
  const textareaId = id ?? name;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          {label && (
            <FieldLabel htmlFor={textareaId} className="font-normal">
              {label}
              {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}

          <FieldContent>
            <Textarea
              {...field}
              {...textareaProps}
              id={textareaId}
              className={`break-words whitespace-pre-wrap ${className ?? ''}`}
              aria-invalid={fieldState.invalid}
              aria-required={required}
              wrap="soft"
            />

            {showError && fieldState.error && <FieldError className="break-words" errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  );
}

export default TextareaFormField;
