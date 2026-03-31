
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../ui/mc-input-otp";

export default function McInputOtpDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} position="left" />
        <InputOTPSlot index={1} position="middle" />
        <InputOTPSlot index={2} position="right" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} position="left" />
        <InputOTPSlot index={4} position="middle" />
        <InputOTPSlot index={5} position="right" />
      </InputOTPGroup>
    </InputOTP>
  );
}
