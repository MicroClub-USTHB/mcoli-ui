import type { Meta, StoryObj } from '@storybook/nextjs';
import { McTabs, McTabsList, McTabsPanel, McTabsTrigger } from '../registry/ui/mc-tabs';

const meta: Meta<typeof McTabs> = {
  title: 'Components/McTabs',
  component: McTabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof McTabs>;

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <McTabs defaultValue="tab1" orientation={args.orientation}>
      <McTabsList>
        <McTabsTrigger value="tab1">Tab 1</McTabsTrigger>
        <McTabsTrigger value="tab2">Tab 2</McTabsTrigger>
      </McTabsList>
      <McTabsPanel value="tab1">Content for the first tab.</McTabsPanel>
      <McTabsPanel value="tab2">Content for the second tab.</McTabsPanel>
    </McTabs>
  ),
};
