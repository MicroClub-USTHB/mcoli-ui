import type { Meta, StoryObj } from '@storybook/nextjs';
import { Breadcrumb } from '@/registry/ui/mc-breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/McBreadcrumb',
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => <Breadcrumb />,
};
