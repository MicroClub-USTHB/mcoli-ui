"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"


const inputOTPSlotVariants = cva(
  "relative flex size-11 items-center justify-center  border border-[#E6E9FF] bg-[#F9FAFF] p-[2px] text-sm font-medium transition-all outline-none",
  {
    variants: {
      position: {
        left:   "rounded-l-md rounded-r-none",
        middle: "rounded-none border-l-0",
        right:  "rounded-r-md rounded-l-none border-l-0",
        alone:  "rounded-md",
      },
      isActive: {
        true:  "bg-[#E6E9FF] z-10 ring-2 ring-[#E6E9FF]/60",
        false: "bg-[#F9FAFF]",
      },
      invalid: {
        true:  "border-destructive ring-2 ring-destructive/20",
        false: "",
      },
    },
    compoundVariants: [
      {
        isActive: true,
        invalid: true,
        className: "border-destructive ring-destructive/20",
      },
    ],
    defaultVariants: {
      position: "middle",
      isActive: false,
      invalid: false,
    },
  },
)

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-[10px] has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}



function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}


export interface InputOTPSlotProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof inputOTPSlotVariants> {
  index: number
}

function InputOTPSlot({
  index,
  position,
  className,
  ...props
}: InputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        inputOTPSlotVariants({
          position,
          isActive,
          invalid: false,
        }),
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}



function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center text-border [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, inputOTPSlotVariants }