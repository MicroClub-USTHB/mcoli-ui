import { Meta, StoryObj } from "@storybook/react-vite"
import { McCheckbox } from "../registry/ui/mc-checkbox"

const meta: Meta<typeof McCheckbox> = {
  title: "Components/McCheckbox",
  component: McCheckbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
    text: { control: "text" },
    supportText: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof McCheckbox>

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: "md",
    text: "Default Checkbox",
    supportText: "This is support text",
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    size: "md",
    text: "Checked Checkbox",
    supportText: "Checkbox is checked",
  },
}

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    size: "md",
    text: "Disabled Checkbox",
    supportText: "Checkbox is disabled",
  },
}

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    size: "md",
    text: "Checked & Disabled",
    supportText: "Checkbox is checked and disabled",
  },
}

export const Small: Story = {
  args: {
    checked: false,
    disabled: false,
    size: "sm",
    text: "Small Checkbox",
    supportText: "Small size variant",
  },
}

export const Interactive: Story = {
  args: {
    checked: false,
    disabled: false,
    size: "md",
    text: "Interactive Checkbox",
    supportText: "Try clicking and focusing me",
  },
}