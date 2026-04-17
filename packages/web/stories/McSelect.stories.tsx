import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McSelect,
  McSelectContent,
  McSelectGroup,
  McSelectIcons,
  McSelectItem,
  McSelectLabel,
  McSelectSeparator,
  McSelectTrigger,
  McSelectValue,
} from '@/registry/ui/mc-select';
import { GlobeIcon, FlagIcon, MapPinIcon, BuildingIcon } from 'lucide-react';

const meta: Meta<typeof McSelectTrigger> = {
  title: 'Components/McSelect',
  component: McSelectTrigger,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'sm'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof McSelectTrigger>;

export const Default: Story = {
  render: (args) => (
    <McSelect>
      <McSelectTrigger {...args}>
        <McSelectValue placeholder="Select a fruit..." />
      </McSelectTrigger>
      <McSelectContent>
        <McSelectGroup>
          <McSelectLabel>Fruits</McSelectLabel>
          <McSelectItem value="apple">Apple</McSelectItem>
          <McSelectItem value="banana">Banana</McSelectItem>
          <McSelectItem value="orange">Orange</McSelectItem>
        </McSelectGroup>
        <McSelectSeparator />
        <McSelectGroup>
          <McSelectLabel>Vegetables</McSelectLabel>
          <McSelectItem value="carrot">Carrot</McSelectItem>
          <McSelectItem value="potato">Potato</McSelectItem>
          <McSelectItem value="tomato">Tomato</McSelectItem>
        </McSelectGroup>
      </McSelectContent>
    </McSelect>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <McSelect>
      <McSelectTrigger {...args}>
        <McSelectIcons>
          <GlobeIcon />
        </McSelectIcons>
        <McSelectValue placeholder="Select a country..." />
      </McSelectTrigger>
      <McSelectContent>
        <McSelectGroup>
          <McSelectLabel>Europe</McSelectLabel>
          <McSelectItem value="france">France</McSelectItem>
          <McSelectItem value="germany">Germany</McSelectItem>
          <McSelectItem value="spain">Spain</McSelectItem>
        </McSelectGroup>
        <McSelectSeparator />
        <McSelectGroup>
          <McSelectLabel>Africa</McSelectLabel>
          <McSelectItem value="algeria">Algeria</McSelectItem>
          <McSelectItem value="morocco">Morocco</McSelectItem>
          <McSelectItem value="egypt">Egypt</McSelectItem>
        </McSelectGroup>
      </McSelectContent>
    </McSelect>
  ),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <McSelect>
      <McSelectTrigger {...args}>
        <McSelectValue placeholder="Select..." />
      </McSelectTrigger>
      <McSelectContent>
        <McSelectGroup>
          <McSelectLabel>Options</McSelectLabel>
          <McSelectItem value="one">Option One</McSelectItem>
          <McSelectItem value="two">Option Two</McSelectItem>
          <McSelectItem value="three">Option Three</McSelectItem>
        </McSelectGroup>
      </McSelectContent>
    </McSelect>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <McSelect disabled>
      <McSelectTrigger {...args}>
        <McSelectValue placeholder="Disabled select..." />
      </McSelectTrigger>
      <McSelectContent>
        <McSelectGroup>
          <McSelectItem value="one">Option One</McSelectItem>
        </McSelectGroup>
      </McSelectContent>
    </McSelect>
  ),
};
