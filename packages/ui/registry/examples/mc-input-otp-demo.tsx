
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
        <McInputOTPSlot index={0}  invalid={false} />
        <McInputOTPSlot index={1} invalid={false}  />
        <McInputOTPSlot index={2}invalid={false} />
      </McInputOTPGroup>
      <McInputOTPSeparator />
      <McInputOTPGroup>
        <McInputOTPSlot index={3}  invalid={false} />
        <McInputOTPSlot index={4}invalid={false}  />
        <McInputOTPSlot index={5}  invalid={false} />
      </McInputOTPGroup>
    </McInputOTP>
  );
}
