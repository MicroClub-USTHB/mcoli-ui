import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McPagination,
  McPaginationContent,
  McPaginationItem,
  McPaginationLink,
  McPaginationPrevious,
  McPaginationNext,
  McPaginationEllipsis,
} from '@/registry/ui/mc-pagination';
import { ArrowRight, Plus, Mail } from 'lucide-react';
import { PaginationItem } from '@/components/ui/pagination';

const meta: Meta<typeof McPagination> = {
  title: 'Components/McPagination',
  component: McPagination,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    icon: {
      control: 'select',
      options: ['none', 'leading', 'trailing', 'dot', 'only'],
    },
    destructive: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    // disabled: { control: 'boolean' },
  },
  args: {
    children: 'Pagitnation',
    variant: 'primary',
    size: 'md',
    icon: 'none',
    destructive: false,
    isLoading: false,
    // disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof McPagination>;

// const iconMap = {
//   None: undefined,
//   Mail: <Mail />,
//   ArrowRight: <ArrowRight />,
//   Plus: <Plus />,
// };

export const Playground: Story = {
  args: {
    variant: 'secondary',
    size: 'xl',
  },

  render: () => (
    <McPagination>
      <McPaginationContent>
        <McPaginationItem>
          <McPaginationPrevious href="#" />
        </McPaginationItem>
        <McPaginationItem>
          <McPaginationLink href="#">1</McPaginationLink>
        </McPaginationItem>
        <McPaginationItem>
          <McPaginationLink href="#" isActive>
            2
          </McPaginationLink>
        </McPaginationItem>
        <McPaginationItem>
          <McPaginationLink href="#">3</McPaginationLink>
        </McPaginationItem>
        <McPaginationItem></McPaginationItem>
        <McPaginationItem>
          <McPaginationNext href="#" />
        </McPaginationItem>
      </McPaginationContent>
    </McPagination>
  ),
};
