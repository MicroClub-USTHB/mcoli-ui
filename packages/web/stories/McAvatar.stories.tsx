import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McAvatar,
  McAvatarBadge,
  McAvatarFallback,
  McAvatarGroup,
  McAvatarGroupCount,
  McAvatarImage,
} from '@/registry/ui/mc-avatar';

const meta = {
  title: 'Components/Avatar',
  component: McAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof McAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <McAvatar>
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>CN</McAvatarFallback>
    </McAvatar>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <McAvatar size="2xl">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>ER</McAvatarFallback>
      <McAvatarBadge></McAvatarBadge>
    </McAvatar>
  ),
};

export const WithImageBadge: Story = {
  render: () => (
    <McAvatar size="2xl">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>ER</McAvatarFallback>
      <McAvatarBadge>
        <img src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      </McAvatarBadge>
    </McAvatar>
  ),
};

export const ExtraSmall: Story = {
  render: () => (
    <McAvatar size="xs">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>CN</McAvatarFallback>
    </McAvatar>
  ),
};

export const Small: Story = {
  render: () => (
    <McAvatar size="sm">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>CN</McAvatarFallback>
    </McAvatar>
  ),
};

export const Medium: Story = {
  render: () => (
    <McAvatar size="md">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>CN</McAvatarFallback>
    </McAvatar>
  ),
};

export const Large: Story = {
  render: () => (
    <McAvatar size="lg">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>CN</McAvatarFallback>
    </McAvatar>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <McAvatar size="xl">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>CN</McAvatarFallback>
    </McAvatar>
  ),
};

export const DoubleLarge: Story = {
  render: () => (
    <McAvatar size="2xl">
      <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
      <McAvatarFallback>CN</McAvatarFallback>
    </McAvatar>
  ),
};

export const Group: Story = {
  render: () => (
    <McAvatarGroup>
      <McAvatar>
        <McAvatarImage src="https://github.com/Adel2411.png" alt="@Adel2411" />
        <McAvatarFallback>CN</McAvatarFallback>
      </McAvatar>
      <McAvatar>
        <McAvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <McAvatarFallback>ML</McAvatarFallback>
      </McAvatar>
      <McAvatar>
        <McAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <McAvatarFallback>ER</McAvatarFallback>
      </McAvatar>
      <McAvatarGroupCount>+3</McAvatarGroupCount>
    </McAvatarGroup>
  ),
};
