import { McRadioGroup, McRadioGroupItem } from '../ui/mc-radio-group';

export default function RadioGroupDemo() {
  return (
    <McRadioGroup defaultValue="remember">
      <McRadioGroupItem
        value="remember"
        id="r1"
        text="Remember me"
        supportText="Save my login details for next time."
      />
    </McRadioGroup>
  );
}
