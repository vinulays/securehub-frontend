"use client";

import React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export interface FormFieldProps<TFormValues extends FieldValues = FieldValues> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  label?: React.ReactNode;
  id?: string;
  type?: string;
  placeholder?: string;
  inputClassName?: string;
  showPasswordToggle?: boolean;
  required?: boolean;
  autoComplete?: React.HTMLInputAutoCompleteAttribute | undefined;
  ariaAutoComplete?: "none" | "inline" | "list" | "both" | undefined;
  showError?: boolean;
  showRequiredErrorOnly?: boolean;
  disabled?: boolean;
}

export function FormField<TFormValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  id,
  type = "text",
  placeholder,
  inputClassName,
  showPasswordToggle,
  required,
  autoComplete,
  ariaAutoComplete,
  showError = true,
  showRequiredErrorOnly = false,
  disabled = false,
}: FormFieldProps<TFormValues>) {
  const inputId = id ?? name;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const shouldShowError = showError && fieldState.invalid;
        const isRequiredError = fieldState.error?.message
          ?.toLowerCase()
          .includes("required");

        const displayError =
          shouldShowError && (!showRequiredErrorOnly || isRequiredError);

        return (
          <Field>
            {label && (
              <FieldLabel htmlFor={inputId} className="font-normal">
                {label}
                {required && <span className="text-destructive">*</span>}
              </FieldLabel>
            )}

            <FieldContent>
              <>
                <Input
                  {...field}
                  id={inputId}
                  type={type}
                  autoComplete={autoComplete}
                  aria-autocomplete={ariaAutoComplete}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid}
                  aria-required={required}
                  className={inputClassName}
                  showPasswordToggle={showPasswordToggle}
                  disabled={disabled}
                />

                {displayError && <FieldError errors={[fieldState.error]} />}
              </>
            </FieldContent>
          </Field>
        );
      }}
    />
  );
}

export default FormField;
