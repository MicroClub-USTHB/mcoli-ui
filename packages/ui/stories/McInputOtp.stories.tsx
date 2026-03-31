


import type { Meta, StoryObj } from '@storybook/nextjs';
type StoryProps = {
  disabled?: boolean
  invalid?: boolean
}
import {
  McInputOTP,
  McInputOTPGroup,
  McInputOTPSlot,
  McInputOTPSeparator,
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
 
  render: (args) => (
    <McInputOTP maxLength={6} {...args}>
      <McInputOTPGroup>
        <McInputOTPSlot index={0}  invalid={args.invalid} />
        <McInputOTPSlot index={1} invalid={args.invalid} />
        <McInputOTPSlot index={2}invalid={args.invalid}  />
     
        <McInputOTPSlot index={3} invalid={args.invalid} />
        <McInputOTPSlot index={4}invalid={args.invalid} />
        <McInputOTPSlot index={5}invalid={args.invalid}  />
      </McInputOTPGroup>
    </McInputOTP>
  )
};

export const WithoutSeparator: Story = {
  render: (args) => (
     <McInputOTP maxLength={6} {...args}>
      <McInputOTPGroup>
        <McInputOTPSlot index={0}  invalid={args.invalid}/>
        <McInputOTPSlot index={1} invalid={args.invalid}/>
        <McInputOTPSlot index={2} invalid={args.invalid}/>
      </McInputOTPGroup>
      <McInputOTPSeparator />
      <McInputOTPGroup>
        <McInputOTPSlot index={3} invalid={args.invalid} />
        <McInputOTPSlot index={4}  invalid={args.invalid}/>
        <McInputOTPSlot index={5}  invalid={args.invalid}/>
      </McInputOTPGroup>
    </McInputOTP>
  ),
};

export const Disabled: Story = {
  render: (args) => (
  <McInputOTP maxLength={7} value="00" {...args}>
      <McInputOTPGroup>
        <McInputOTPSlot index={0} invalid={args.invalid} />
        <McInputOTPSlot index={1} invalid={args.invalid} />
      </McInputOTPGroup>
      <McInputOTPSeparator />
      <McInputOTPGroup>
        <McInputOTPSlot index={2}invalid={args.invalid} />
        <McInputOTPSlot index={3} invalid={args.invalid} />
        <McInputOTPSlot index={4} invalid={args.invalid} />
      </McInputOTPGroup>
      <McInputOTPSeparator />
      <McInputOTPGroup>
        <McInputOTPSlot index={5} invalid={args.invalid} />
        <McInputOTPSlot index={6} invalid={args.invalid} />
      </McInputOTPGroup>
    </McInputOTP>
  ),
};


export const Invalid: Story = {
  render: (args) => (
    <McInputOTP maxLength={6} {...args}>
      <McInputOTPGroup>
        <McInputOTPSlot index={0}  invalid={args.invalid}/>
        <McInputOTPSlot index={1}  invalid={args.invalid}/>
        <McInputOTPSlot index={2}  invalid={args.invalid} />
        <McInputOTPSlot index={3}  invalid={args.invalid} />
        <McInputOTPSlot index={4}  invalid={args.invalid} />
        <McInputOTPSlot index={5} invalid={args.invalid} />
      </McInputOTPGroup>
    </McInputOTP>
  ),
}
export const leftOne: Story = {
  render: (args) => (
    <McInputOTP maxLength={1} {...args}>
      
        <McInputOTPSlot index={0}  invalid={args.invalid}/>
        
    </McInputOTP>
  ),
}
export const RightOne: Story = {
  render: (args) => (
    <McInputOTP maxLength={1} {...args}>
      
        <McInputOTPSlot index={0}  invalid={args.invalid}/>
        
    </McInputOTP>
  ),
}
export const middleOne: Story = {
  render: (args) => (
    <McInputOTP maxLength={1} {...args}>
      
        <McInputOTPSlot index={0}  invalid={args.invalid}/>
        
    </McInputOTP>
  ),
}
