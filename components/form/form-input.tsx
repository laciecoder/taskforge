"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>; // Record key value map type
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    }: FormInputProps,
    ref
  ) {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div>
          {label && (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label} 
            </Label>
          )}
          <Input
            ref={ref}
            className={cn("text-sm px-2 py-2 h-7", className)}
            required={required}
            onBlur={onBlur}
            defaultValue={defaultValue}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            aria-describedby={`${id}-error`} // for screen readers sake
          />
        </div>
        <FormErrors id={id} errors={errors}/>
      </div>
    );
  }
);

// for debug purpose
FormInput.displayName = "FormInput";
