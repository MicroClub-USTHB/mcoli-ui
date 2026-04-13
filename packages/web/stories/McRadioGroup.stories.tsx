import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { McRadioGroup, McRadioGroupItem } from '@/registry/ui/mc-radio-group';

const meta: Meta<typeof McRadioGroupItem> = {
  title: 'Components/McRadioGroup',
  component: McRadioGroupItem,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    text: { control: 'text' },
    supportText: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    size: 'sm',
    text: 'Remember me',
    disabled: false,
    value: 'remember',
  },
};

export default meta;

type Story = StoryObj<typeof McRadioGroupItem>;

export const Playground: Story = {
  args: {
    size: 'sm',
    text: 'Remember me',
    supportText: 'Save my login details for next time.',
    value: 'remember',
  },
  render: (args) => (
    <McRadioGroup defaultValue="remember">
      <McRadioGroupItem {...args} id="pg1" />
    </McRadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Small</span>
        <McRadioGroup defaultValue="sm">
          <McRadioGroupItem value="sm" id="s1" size="sm" text="Remember me" />
          <McRadioGroupItem value="md" id="s2" size="sm" text="Remember me" />
        </McRadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Medium</span>
        <McRadioGroup defaultValue="sm">
          <McRadioGroupItem value="sm" id="m1" size="md" text="Remember me" />
          <McRadioGroupItem value="md" id="m2" size="md" text="Remember me" />
        </McRadioGroup>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => {
    const [value, setValue] = React.useState('unchecked');

    return (
      <div className="flex flex-col gap-4">
        <McRadioGroup value={value} onValueChange={setValue}>
          <McRadioGroupItem value="unchecked" id="st1" text="Remember me" />
          <McRadioGroupItem value="checked" id="st2" text="Remember me" />
          <McRadioGroupItem value="disabled" id="st3" text="Remember me" disabled />
        </McRadioGroup>
      </div>
    );
  },
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <McRadioGroup defaultValue="sm">
        <McRadioGroupItem value="sm" id="wt1" size="sm" text="Remember me" />
        <McRadioGroupItem value="md" id="wt2" size="md" text="Remember me" />
      </McRadioGroup>
    </div>
  ),
};

export const WithSupportText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <McRadioGroup defaultValue="option1">
        <McRadioGroupItem
          value="option1"
          id="wst1"
          text="Remember me"
          supportText="Save my login details for next time."
        />
        <McRadioGroupItem
          value="option2"
          id="wst2"
          text="Remember me"
          supportText="Save my login details for next time."
        />
        <McRadioGroupItem
          value="option3"
          id="wst3"
          text="Remember me"
          supportText="Save my login details for next time."
          disabled
        />
      </McRadioGroup>
    </div>
  ),
};

export const AllSizesWithAllStates: Story = {
  render: () => {
    const [selectedState, setSelectedState] = React.useState('unchecked');

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Small - States</span>
          <McRadioGroup value={selectedState} onValueChange={setSelectedState}>
            <McRadioGroupItem value="unchecked" id="as1" size="sm" text="Remember me" />
            <McRadioGroupItem value="checked" id="as2" size="sm" text="Remember me" />
            <McRadioGroupItem value="disabled" id="as3" size="sm" text="Remember me" disabled />
            <McRadioGroupItem
              value="disabled-checked"
              id="as4"
              size="sm"
              text="Remember me"
              disabled
            />
          </McRadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Medium - States</span>
          <McRadioGroup defaultValue="option1">
            <McRadioGroupItem value="option1" id="am1" size="md" text="Remember me" />
            <McRadioGroupItem value="option2" id="am2" size="md" text="Remember me" />
            <McRadioGroupItem value="option3" id="am3" size="md" text="Remember me" disabled />
            <McRadioGroupItem value="option4" id="am4" size="md" text="Remember me" disabled />
          </McRadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Small with support text</span>
          <McRadioGroup defaultValue="opt1">
            <McRadioGroupItem
              value="opt1"
              id="asst1"
              size="sm"
              text="Remember me"
              supportText="Save my login details for next time."
            />
            <McRadioGroupItem
              value="opt2"
              id="asst2"
              size="sm"
              text="Remember me"
              supportText="Save my login details for next time."
            />
          </McRadioGroup>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Medium with support text</span>
          <McRadioGroup defaultValue="opt1">
            <McRadioGroupItem
              value="opt1"
              id="msst1"
              size="md"
              text="Remember me"
              supportText="Save my login details for next time."
            />
            <McRadioGroupItem
              value="opt2"
              id="msst2"
              size="md"
              text="Remember me"
              supportText="Save my login details for next time."
            />
          </McRadioGroup>
        </div>
      </div>
    );
  },
};
