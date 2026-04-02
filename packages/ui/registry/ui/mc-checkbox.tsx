"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckIcon ,MinusIcon  } from "lucide-react"
import * as React from "react"

const checkboxVariants = cva("", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
    },
  },
  defaultVariants: { size: "md" },
})

const labelVariants = cva("font-medium text-foreground cursor-pointer", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
})

const supportTextVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
})

export interface McCheckboxProps
  extends Omit<CheckboxPrimitive.Root.Props, "size" | "checked">,
    VariantProps<typeof checkboxVariants> {
  text?: string
  supportText?: string
  checked?: boolean | "indeterminate"
}

function McCheckbox({
  className,
  size,
  text,
  supportText,
  id,
  disabled,
  indeterminate,
  ...props
}: McCheckboxProps) {
  const generatedId = React.useId()
  const checkboxId = id ?? generatedId

  return (
    // wrapper handles disabled fading for EVERYTHING including text
    <div className={cn(
      "flex items-start gap-2",
      disabled && "opacity-50 cursor-not-allowed"
    )}>
      <CheckboxPrimitive.Root
        id={checkboxId}
        data-slot="checkbox"
        disabled={disabled}
        indeterminate={indeterminate}
        aria-describedby={supportText ? `${checkboxId}-description` : undefined}
        className={cn(
          // layout
          "peer relative flex shrink-0 items-center justify-center",
          // shape
          "rounded-[4px] border border-border",
          // background
          "bg-background dark:bg-input/30",
          // transition
          "transition-colors outline-none",
          // extended click area
          "after:absolute after:-inset-x-3 after:-inset-y-2",

          // hover
          "hover:border-primary/60",

          // focus 
          "focus-visible:bg-primary/10 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/30",

          // checked
          
          "data-checked:border-primary data-checked:text-primary",
          "dark:data-checked:border-primary dark:data-checked:text-primary",

          // checked + focused 
          "data-checked:focus-visible:ring-primary/30",

          // disabled 
          "disabled:pointer-events-none",

          // invalid state
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
          "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",

          // group disabled
          "group-has-disabled/field:opacity-50",

          // size from CVA
          checkboxVariants({ size }),
          className
        )}
        {...props}
      >
       <CheckboxPrimitive.Indicator
  data-slot="checkbox-indicator"
  className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
>
 
  {indeterminate ? <MinusIcon /> : <CheckIcon />}
</CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(text || supportText) && (
        <div className="flex flex-col gap-0.5">
          {text && (
            <label
              htmlFor={checkboxId}
              className={cn(
                labelVariants({ size }),
                disabled && "pointer-events-none"
              )}
            >
              {text}
            </label>
          )}
          {supportText && (
            <span
              id={`${checkboxId}-description`}
              className={cn(supportTextVariants({ size }))}
            >
              {supportText}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export { McCheckbox, checkboxVariants }