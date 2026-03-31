import type { Meta, StoryObj } from '@storybook/nextjs';
type StoryProps = {
  disabled?: boolean
  invalid?: boolean
}
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/registry/ui/mc-input-otp';

const meta: Meta = {
  title: 'Components/McInputOtp',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
     invalid: { control: 'boolean' }, 
  },
  args: {
      invalid: false,
      disabled: false,
  },
};
type Story = StoryObj<StoryProps>;

export default meta;


export const Default: Story = {
  args: {
    invalid: true
  },

  render: (args) => (
    <InputOTP maxLength={6} {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} position="left" />
        <InputOTPSlot index={1} position="middle"/>
        <InputOTPSlot index={2}position="middle" />
     
        <InputOTPSlot index={3}position="middle" />
        <InputOTPSlot index={4}position="middle"/>
        <InputOTPSlot index={5} position="right" />
      </InputOTPGroup>
    </InputOTP>
  )
};

export const WithoutSeparator: Story = {
  render: (args) => (
     <InputOTP maxLength={6} {...args}>
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
  ),
};

export const Disabled: Story = {
  render: (args) => (
  <InputOTP maxLength={7} value="00" {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} position="left" />
        <InputOTPSlot index={1} position="right" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} position="left" />
        <InputOTPSlot index={3} position="middle" />
        <InputOTPSlot index={4} position="right" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={5} position="left" />
        <InputOTPSlot index={6} position="right" />
      </InputOTPGroup>
    </InputOTP>
  ),
};


export const Invalid: Story = {
  render: (args) => (
    <InputOTP maxLength={6} {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} position="left" invalid={args.invalid}/>
        <InputOTPSlot index={1} position="middle" invalid={args.invalid}/>
        <InputOTPSlot index={2} position="middle" invalid={args.invalid} />
        <InputOTPSlot index={3} position="middle" invalid={args.invalid} />
        <InputOTPSlot index={4} position="middle" invalid={args.invalid} />
        <InputOTPSlot index={5} position="right" invalid={args.invalid} />
      </InputOTPGroup>
    </InputOTP>
  ),
}