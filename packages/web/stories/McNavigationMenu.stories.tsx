import type { Meta, StoryObj } from '@storybook/react';
import { McNavigationMenu } from '../src/McNavigationMenu';

const meta = {
  title: 'Components/McNavigationMenu',
  component: McNavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof McNavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};

export const WithActiveItem: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about', active: true },
      { label: 'Services', href: '/services' },
    ],
  },
};
