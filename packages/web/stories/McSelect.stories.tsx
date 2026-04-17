import type { Meta, StoryObj } from '@storybook/nextjs';
import { UserIcon } from 'lucide-react';

import {
  McSelect,
  McSelectContent,
  McSelectGroup,
  McSelectGroupLabel,
  McSelectItem,
  McSelectLabel,
  McSelectTrigger,
  McSelectValue,
} from '../registry/ui/mc-select';

// ─── Data ────────────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    value: 'olivia',
    name: 'Olivia Rhye',
    username: '@olivia',
    avatar: 'https://i.pravatar.cc/32?img=47',
    online: true,
  },
  {
    value: 'phoenix',
    name: 'Phoenix Baker',
    username: '@phoenix',
    avatar: 'https://i.pravatar.cc/32?img=12',
    online: false,
  },
  {
    value: 'lana',
    name: 'Lana Steiner',
    username: '@lana',
    avatar: 'https://i.pravatar.cc/32?img=5',
    online: true,
  },
  {
    value: 'demi',
    name: 'Demi Wilkinson',
    username: '@demi',
    avatar: 'https://i.pravatar.cc/32?img=9',
    online: false,
  },
  {
    value: 'candice',
    name: 'Candice Wu',
    username: '@candice',
    avatar: 'https://i.pravatar.cc/32?img=23',
    online: true,
  },
];

function Avatar({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="size-5 rounded-full object-cover" />;
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<{ showLabel: boolean }> = {
  title: 'Components/McSelect',
  parameters: {
    docs: {
      description: {
        component:
          'A styled select component built on @base-ui-components/react/select. Supports five variants: `default`, `icon-leading`, `avatar-leading`, `dot-leading`, and `search`.',
      },
    },
  },
  // ← Ici on déclare le control global showLabel
  argTypes: {
    showLabel: {
      control: 'boolean',
      description: 'Affiche ou masque le label au-dessus du trigger',
      defaultValue: false,
    },
  },
  args: {
    showLabel: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<{ showLabel: boolean }>;

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: ({ showLabel }) => (
    <div>
      {showLabel && <McSelectLabel>Team member</McSelectLabel>}
      <McSelect>
        <McSelectTrigger variant="default">
          <McSelectValue placeholder="Select team member" />
        </McSelectTrigger>
        <McSelectContent>
          <McSelectGroup>
            <McSelectGroupLabel>Team members</McSelectGroupLabel>
            {TEAM_MEMBERS.map((m) => (
              <McSelectItem key={m.value} value={m.value}>
                {m.name}
              </McSelectItem>
            ))}
          </McSelectGroup>
        </McSelectContent>
      </McSelect>
    </div>
  ),
};

export const IconLeading: Story = {
  render: ({ showLabel }) => (
    <div>
      {showLabel && <McSelectLabel>Team member</McSelectLabel>}
      <McSelect>
        <McSelectTrigger variant="icon-leading" leadingIcon={<UserIcon />}>
          <McSelectValue placeholder="Select team member" />
        </McSelectTrigger>
        <McSelectContent>
          <McSelectGroup>
            <McSelectGroupLabel>Team members</McSelectGroupLabel>
            {TEAM_MEMBERS.map((m) => (
              <McSelectItem key={m.value} value={m.value} leadingIcon={<UserIcon />}>
                {m.name}
              </McSelectItem>
            ))}
          </McSelectGroup>
        </McSelectContent>
      </McSelect>
    </div>
  ),
};

export const AvatarLeading: Story = {
  render: ({ showLabel }) => (
    <div>
      {showLabel && <McSelectLabel>Team member</McSelectLabel>}
      <McSelect>
        <McSelectTrigger
          variant="avatar-leading"
          leadingAvatar={<Avatar src={TEAM_MEMBERS[0].avatar} alt={TEAM_MEMBERS[0].name} />}
        >
          <McSelectValue placeholder="Select team member" />
        </McSelectTrigger>
        <McSelectContent>
          <McSelectGroup>
            <McSelectGroupLabel>Team members</McSelectGroupLabel>
            {TEAM_MEMBERS.map((m) => (
              <McSelectItem
                key={m.value}
                value={m.value}
                leadingAvatar={<Avatar src={m.avatar} alt={m.name} />}
                supportingText={m.username}
              >
                {m.name}
              </McSelectItem>
            ))}
          </McSelectGroup>
        </McSelectContent>
      </McSelect>
    </div>
  ),
};

export const DotLeading: Story = {
  render: ({ showLabel }) => (
    <div>
      {showLabel && <McSelectLabel>Team member</McSelectLabel>}
      <McSelect>
        <McSelectTrigger variant="dot-leading" dotColor="bg-green-500">
          <McSelectValue placeholder="Select team member" />
        </McSelectTrigger>
        <McSelectContent>
          <McSelectGroup>
            <McSelectGroupLabel>Team members</McSelectGroupLabel>
            {TEAM_MEMBERS.map((m) => (
              <McSelectItem
                key={m.value}
                value={m.value}
                dotColor={m.online ? 'bg-green-500' : 'bg-gray-300'}
              >
                {m.name}
              </McSelectItem>
            ))}
          </McSelectGroup>
        </McSelectContent>
      </McSelect>
    </div>
  ),
};

export const Search: Story = {
  render: ({ showLabel }) => (
    <div>
      {showLabel && <McSelectLabel>Search</McSelectLabel>}
      <McSelect>
        <McSelectTrigger variant="search">
          <McSelectValue placeholder="Search" />
        </McSelectTrigger>
        <McSelectContent>
          <McSelectGroup>
            <McSelectGroupLabel>Team members</McSelectGroupLabel>
            {TEAM_MEMBERS.map((m) => (
              <McSelectItem key={m.value} value={m.value} supportingText={m.username}>
                {m.name}
              </McSelectItem>
            ))}
          </McSelectGroup>
        </McSelectContent>
      </McSelect>
    </div>
  ),
};
