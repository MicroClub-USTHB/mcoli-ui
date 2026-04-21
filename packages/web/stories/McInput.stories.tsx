import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import { McInput, McInputButton } from '@/registry/ui/mc-input';
import {
  Eye,
  EyeOff,
  DollarSign,
  Globe,
  Copy,
  ChevronDown,
  Lock,
  AtSign,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tlds = ['.com', '.org', '.net', '.io'] as const;

function DomainInput(props: React.ComponentProps<typeof McInput>) {
  const [tld, setTld] = React.useState<string>(tlds[0]);
  const [open, setOpen] = React.useState(false);

  return (
    <McInput
      {...props}
      label="Domain"
      addonStart={
        <>
          <Globe />
          <span>https://</span>
        </>
      }
      addonEnd={
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setOpen(!open)}
          >
            <span className="mb-0.5">{tld}</span>
            <ChevronDown className={cn('size-3.5', open && 'rotate-180')} />
          </button>
          {open && (
            <ul className="absolute right-0 top-full z-10 mt-1 min-w-20 rounded-md border border-border bg-popover p-1 shadow-md">
              {tlds.map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    className={`w-full rounded-sm py-1 ps-2 pe-8 text-left text-sm transition-colors hover:bg-accent ${t === tld ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
                    onClick={() => {
                      setTld(t);
                      setOpen(false);
                    }}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      }
      placeholder="yoursite"
    />
  );
}

const meta: Meta<typeof McInput> = {
  title: 'Components/McInput',
  component: McInput,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url', 'search', 'tel'],
    },
  },
  args: {
    label: 'Email',
    placeholder: 'olivia@untitledui.com',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof McInput>;

export const Playground: Story = {
  args: {
    label: 'Email',
    description: 'This is a hint text to help user.',
    placeholder: 'olivia@untitledui.com',
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-sm">
      <McInput
        {...args}
        label="Error with message"
        error="Please enter a valid email address."
        placeholder="olivia@untitledui.com"
      />
      <McInput {...args} label="Error border only" error={true} placeholder="No message shown" />
      <McInput {...args} label="Disabled" disabled defaultValue="olivia@untitledui.com" />
    </div>
  ),
};

export const ErrorReplacesDescription: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const error = value.length > 0 && !value.includes('@') ? 'Must be a valid email.' : undefined;

    return (
      <div className="max-w-sm">
        <McInput
          label="Email"
          description="We'll never share your email."
          error={error}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="olivia@untitledui.com"
        />
      </div>
    );
  },
};

export const PasswordToggle: Story = {
  render: (args) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <div className="max-w-sm">
        <McInput
          {...args}
          label="Password"
          type={visible ? 'text' : 'password'}
          description="Must be at least 8 characters."
          addonEnd={
            <McInputButton variant="ghost" onClick={() => setVisible(!visible)}>
              {visible ? <EyeOff /> : <Eye />}
            </McInputButton>
          }
          placeholder="Enter password"
        />
      </div>
    );
  },
};

export const BlockAddons: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const max = 280;

    return (
      <div className="flex flex-col gap-6 max-w-sm">
        <McInput
          label="Amount"
          addonTop={
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-medium">Balance: $1,234.56</span>
              <button className="text-xs font-medium text-primary hover:underline">Max</button>
            </div>
          }
          addonStart={<DollarSign />}
          placeholder="0.00"
          type="number"
        />
        <McInput
          label="Bio"
          addonBottom={
            <span className="ml-auto text-xs">
              {value.length}/{max}
            </span>
          }
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, max))}
          placeholder="Tell us about yourself"
        />
      </div>
    );
  },
};

export const ButtonVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-sm">
      <McInput
        {...args}
        label="Ghost (default)"
        addonEnd={<McInputButton variant="ghost">Copy</McInputButton>}
        placeholder="Click the button..."
      />
      <McInput
        {...args}
        label="Outline"
        addonEnd={<McInputButton variant="outline">Copy</McInputButton>}
        placeholder="Click the button..."
      />
      <McInput
        {...args}
        label="Filled"
        addonEnd={<McInputButton variant="filled">Submit</McInputButton>}
        placeholder="Click the button..."
      />
      <McInput
        {...args}
        label="Attached end"
        addonStart={<Search />}
        addonEnd={<McInputButton variant="attached">Search</McInputButton>}
        placeholder="Search anything..."
      />
      <McInput
        {...args}
        label="Attached start"
        addonStart={<McInputButton variant="attached">Browse</McInputButton>}
        placeholder="Select a file..."
      />
    </div>
  ),
};

export const KitchenSink: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-sm">
      <McInput
        {...args}
        label="Transaction Amount"
        description="Enter the amount in USD."
        addonStart="$"
        addonEnd={<McInputButton variant="attached">Convert</McInputButton>}
        addonBottom={<span className="text-xs">Min: $1.00 &middot; Max: $10,000</span>}
        placeholder="0.00"
        type="number"
      />
      <McInput
        {...args}
        label="Transaction Amount"
        error="Amount exceeds maximum limit."
        addonStart="$"
        addonEnd={<McInputButton variant="attached">Convert</McInputButton>}
        addonBottom={<span className="text-xs">Min: $1.00 &middot; Max: $10,000</span>}
        defaultValue="99999"
        type="number"
      />
    </div>
  ),
};

export const MultipleAddonsOneSide: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 max-w-sm">
      <McInput
        {...args}
        label="Email"
        addonStart={
          <>
            <AtSign />
            <span>Email</span>
          </>
        }
        placeholder="olivia@untitledui.com"
      />
      <McInput
        {...args}
        label="Password"
        type="password"
        addonStart={<Lock />}
        addonEnd={
          <>
            <McInputButton variant="ghost">
              <Eye />
            </McInputButton>
            <McInputButton variant="ghost">
              <Copy />
            </McInputButton>
          </>
        }
        placeholder="Enter password"
      />
      <McInput
        {...args}
        label="Amount"
        addonStart={
          <>
            <DollarSign />
            <span>USD</span>
          </>
        }
        addonEnd={
          <>
            <span className="text-xs">fee: $0.50</span>
            <McInputButton variant="outline">Max</McInputButton>
          </>
        }
        placeholder="0.00"
        type="number"
      />
      <DomainInput {...args} />
    </div>
  ),
};
