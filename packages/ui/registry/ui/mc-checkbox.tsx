"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "peer relative flex shrink-0 items-center justify-center transition-colors outline-none " +
    "w-5 h-5 rounded-[6px] border border-muted-foreground " +
    "hover:border-primary " +
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-muted-foreground",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type McCheckboxProps = CheckboxPrimitive.Root.Props &
  VariantProps<typeof checkboxVariants> & {
    text?: string
    supportText?: string
  }

export function McCheckbox({
  className,
  size,
  text,
  supportText,
  id,
  checked,
  disabled,
  ...props
}: McCheckboxProps) {
  const generatedId = React.useId()
  const checkboxId = id ?? generatedId

  return (
    <div className="flex items-start gap-2">
      <CheckboxPrimitive.Root
        id={checkboxId}
        data-slot="checkbox"
        className={cn(
          checkboxVariants({ size }),
          !disabled && checked && "border-primary text-primary",
          disabled && "border-muted-foreground",
          !disabled && "focus-visible:ring-4 focus-visible:ring-ring focus-visible:border-border",
          className
        )}
        checked={checked}
        disabled={disabled}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "grid place-content-center [&>svg]:w-3.5 [&>svg]:h-3.5",
            !disabled && checked && "text-[#0006B1]",
            disabled && "text-[#54588B]"
          )}
        >
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(text || supportText) && (
        <div className="flex flex-col">
          {text && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium leading-none cursor-pointer",
                disabled && "text-muted-foreground cursor-not-allowed"
              )}
            >
              {text}
            </label>
          )}
          {supportText && (
            <p className="text-xs text-muted-foreground">
              {supportText}
            </p>
          )}
        </div>
      )}
    </div>
  )
}