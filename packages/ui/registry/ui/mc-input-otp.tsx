"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"


const inputOTPSlotVariants = cva(
  "relative flex size-11 items-center justify-center border border-border bg-input p-[2px] text-sm font-medium transition-all outline-none",
  {
   
  },
)



