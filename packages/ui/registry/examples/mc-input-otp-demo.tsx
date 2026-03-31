
import {
  McInputOTP,
  McInputOTPGroup,
  McInputOTPSlot,
  McInputOTPSeparator,
} from "../ui/mc-input-otp";

export default function McInputOtpDemo() {
  return (
    <McInputOTP maxLength={6}>
      <McInputOTPGroup>
        <McInputOTPSlot index={0} position="left" />
        <McInputOTPSlot index={1} position="middle" />
        <McInputOTPSlot index={2} position="right" />
      </McInputOTPGroup>
      <McInputOTPSeparator />
      <McInputOTPGroup>
        <McInputOTPSlot index={3} position="left" />
        <McInputOTPSlot index={4} position="middle" />
        <McInputOTPSlot index={5} position="right" />
      </McInputOTPGroup>
    </McInputOTP>
  );
}
