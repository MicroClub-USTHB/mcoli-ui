import type { Meta, StoryObj } from '@storybook/nextjs'
import { McCheckbox } from '@/registry/ui/mc-checkbox'

const meta: Meta<typeof McCheckbox> = {
  title: 'Components/McCheckbox',
  component: McCheckbox,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    text: { control: 'text' },
    supportText: { control: 'text' },
  },
  args: {
    size: 'md',
    disabled: false,
    defaultChecked: false,
    text: 'Remember me',
    supportText: '',
  },
}

export default meta
type Story = StoryObj<typeof McCheckbox>


export const Playground: Story = {
  args: {
    text: 'Remember me',
  },
}


export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <McCheckbox {...args} text="Remember me" />
      <McCheckbox {...args} text="Remember me" defaultChecked />
      <McCheckbox {...args} text="Remember me" disabled />
      <McCheckbox {...args} text="Remember me" disabled defaultChecked />
    </div>
  ),
}


export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <div className="flex flex-col gap-4">
        <McCheckbox {...args} size="sm" text="Remember me" />
        <McCheckbox {...args} size="sm" text="Remember me" defaultChecked />
      </div>
      <div className="flex flex-col gap-4">
        <McCheckbox {...args} size="md" text="Remember me" />
        <McCheckbox {...args} size="md" text="Remember me" defaultChecked />
      </div>
    </div>
  ),
}


export const WithSupportText: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <McCheckbox
        {...args}
        text="Remember me"
        supportText="Save my login details for next time."
      />
      <McCheckbox
        {...args}
        text="Remember me"
        supportText="Save my login details for next time."
        defaultChecked
      />
      <McCheckbox
        {...args}
        text="Remember me"
        supportText="Save my login details for next time."
        disabled
      />
    </div>
  ),
}


export const Bare: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <McCheckbox {...args} />
      <McCheckbox {...args} defaultChecked />
      <McCheckbox {...args} disabled />
    </div>
  ),
}