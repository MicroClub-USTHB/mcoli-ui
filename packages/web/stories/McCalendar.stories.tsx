import type { Meta, StoryObj } from '@storybook/nextjs';
import { McCalendar } from '@/registry/ui/mc-calendar';

const meta = {
  title: 'Components/McCalendar',
  component: McCalendar,
  tags: ['autodocs'],
} satisfies Meta<typeof McCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
