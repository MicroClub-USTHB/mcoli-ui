import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { McTextarea } from '@/registry/ui/mc-textarea';
import { McInputButton } from '@/registry/ui/mc-input';
import { Send, Paperclip } from 'lucide-react';

const meta: Meta<typeof McTextarea> = {
  title: 'Components/McTextarea',
  component: McTextarea,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
  args: {
    label: 'Message',
    placeholder: 'Type your message...',
    disabled: false,
    required: false,
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof McTextarea>;

export const Playground: Story = {
  args: {
    label: 'Message',
    description: 'This is a hint text to help user.',
    placeholder: 'Type your message...',
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-sm">
      <McTextarea
        {...args}
        label="Error with message"
        error="Message is required."
        placeholder="Type your message..."
      />
      <McTextarea {...args} label="Error border only" error={true} placeholder="No message shown" />
      <McTextarea {...args} label="Disabled" disabled defaultValue="This textarea is disabled." />
    </div>
  ),
};

export const CharacterCounter: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const max = 280;

    return (
      <div className="max-w-sm">
        <McTextarea
          label="Post"
          description="Share your thoughts."
          addonBottom={
            <span className="ml-auto text-xs">
              {value.length}/{max}
            </span>
          }
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, max))}
          placeholder="What's happening?"
          rows={4}
        />
      </div>
    );
  },
};

export const WithHeaderInfo: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <McTextarea
        {...args}
        label="Support Ticket"
        addonTop={
          <div className="flex w-full items-center justify-between">
            <span className="text-xs font-medium">Ticket #4021</span>
            <span className="text-xs text-muted-foreground">Priority: High</span>
          </div>
        }
        placeholder="Describe the issue..."
        rows={4}
      />
    </div>
  ),
};

export const WithActionBar: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="max-w-sm">
        <McTextarea
          label="Feedback"
          addonBottom={
            <div className="flex w-full items-center justify-between">
              <McInputButton variant="ghost">
                <Paperclip />
              </McInputButton>
              <div className="flex items-center gap-2">
                <span className="text-xs">{value.length} characters</span>
                <McInputButton variant="filled">
                  <Send />
                  Send
                </McInputButton>
              </div>
            </div>
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tell us what you think..."
          rows={4}
        />
      </div>
    );
  },
};

export const KitchenSink: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const max = 500;

    return (
      <div className="max-w-sm">
        <McTextarea
          label="Bug Report"
          description="Include steps to reproduce."
          addonTop={
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-medium">Issue #127</span>
              <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
                Bug
              </span>
            </div>
          }
          addonBottom={
            <div className="flex w-full items-center justify-between">
              <McInputButton variant="ghost">
                <Paperclip />
              </McInputButton>
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {value.length}/{max}
                </span>
                <McInputButton variant="filled">Submit</McInputButton>
              </div>
            </div>
          }
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, max))}
          placeholder="Describe what happened..."
          rows={5}
        />
      </div>
    );
  },
};
