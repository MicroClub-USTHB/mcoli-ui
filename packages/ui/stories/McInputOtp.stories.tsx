import type { Meta, StoryObj } from '@storybook/nextjs';
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
  },
  args: {
    
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
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
  ),
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

export const FourDigits: Story = {
  render: (args) => (
 <InputOTP maxLength={6} disabled {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} position="left" />
        <InputOTPSlot index={1} position="middle" />
        <InputOTPSlot index={2} position="middle" />
        <InputOTPSlot index={3} position="middle" />
        <InputOTPSlot index={4} position="middle" />
        <InputOTPSlot index={5} position="right" />
      </InputOTPGroup>
    </InputOTP>
  ),
};