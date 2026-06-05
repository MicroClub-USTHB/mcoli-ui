import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/registry/ui/mc-avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Avatar size="2xl">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>ER</AvatarFallback>
      <AvatarBadge></AvatarBadge>
    </Avatar>
  ),
};

export const WithImageBadge: Story = {
  render: () => (
    <Avatar size="2xl">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>ER</AvatarFallback>
      <AvatarBadge>
        <img src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      </AvatarBadge>
    </Avatar>
  ),
};

export const ExtraSmall: Story = {
  render: () => (
    <Avatar size="xs">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Small: Story = {
  render: () => (
    <Avatar size="sm">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Medium: Story = {
  render: () => (
    <Avatar size="md">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Large: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <Avatar size="xl">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const DoubleLarge: Story = {
  render: () => (
    <Avatar size="2xl">
      <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
