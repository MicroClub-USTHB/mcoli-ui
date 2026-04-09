import type { Meta, StoryObj } from '@storybook/nextjs';
import { McTabs, McTabsList, McTabsTrigger } from '../registry/ui/mc-tabs';

const meta: Meta<typeof McTabs> = {
  title: 'Components/McTabs',
  component: McTabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof McTabs>;

export const HorizontalTabs: Story = {
  render: () => (
    <McTabs defaultValue="tab1">
      <McTabsList>
        <McTabsTrigger value="tab1">Tab 1</McTabsTrigger>
        <McTabsTrigger value="tab2">Tab 2</McTabsTrigger>
        <McTabsTrigger value="tab3">Tab 3</McTabsTrigger>
      </McTabsList>
    </McTabs>
  ),
};

export const VerticalTabs: Story = {
  render: () => (
    <McTabs defaultValue="tab1">
      <McTabsList variant="vertical">
        <McTabsTrigger value="tab1">Tab 1</McTabsTrigger>
        <McTabsTrigger value="tab2">Tab 2</McTabsTrigger>
        <McTabsTrigger value="tab3">Tab 3</McTabsTrigger>
      </McTabsList>
    </McTabs>
  ),
};
