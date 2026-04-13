import type { Meta, StoryObj } from '@storybook/nextjs';
import { McTabs, McTabsList, McTabsTrigger } from '../registry/ui/mc-tabs';

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
  render: (args) => {
    const isVertical = args.orientation === 'vertical';

    return (
      <McTabs defaultValue="tab1">
        <McTabsList variant={isVertical ? 'vertical' : undefined}>
          <McTabsTrigger value="tab1">Tab 1</McTabsTrigger>
          <McTabsTrigger value="tab2">Tab 2</McTabsTrigger>
        </McTabsList>
      </McTabs>
    );
  },
};
