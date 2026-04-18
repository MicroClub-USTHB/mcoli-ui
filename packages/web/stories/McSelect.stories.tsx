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
import React from 'react';

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

const meta: Meta<{ showLabel: boolean; scrollLabel: boolean }> = {
  title: 'Components/McSelect',
  parameters: {
    docs: {
      description: {
        component:
          'A styled select component built on @base-ui-components/react/select. Supports five variants: `default`, `icon-leading`, `avatar-leading`, `dot-leading`, and `search`.',
      },
    },
  },
  // ← Ici on déclare les controls globaux showLabel et scrollLabel
  argTypes: {
    showLabel: {
      control: 'boolean',
      description: 'Affiche ou masque le label au-dessus du trigger',
      defaultValue: false,
    },
    scrollLabel: {
      control: 'boolean',
      description: 'Affiche la barre de défilement dans le menu',
      defaultValue: false,
    },
  },
  args: {
    showLabel: false,
    scrollLabel: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<{ showLabel: boolean; scrollLabel: boolean }>;

export const Default: Story = {
  render: ({ showLabel, scrollLabel }) => {
    const [value, setValue] = React.useState<string | null>(null);

    const selected = TEAM_MEMBERS.find((m) => m.value === value);

    return (
      <div>
        {showLabel && <McSelectLabel>Team member</McSelectLabel>}

        <McSelect value={value} onValueChange={setValue}>
          <McSelectTrigger variant="default">
            <McSelectValue placeholder="Select team member">
              {selected ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selected.name}</span>
                  {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
                </div>
              ) : null}
            </McSelectValue>
          </McSelectTrigger>

          <McSelectContent scrollbar={scrollLabel}>
            <McSelectGroup>
              <McSelectGroupLabel>Team members</McSelectGroupLabel>

              {TEAM_MEMBERS.map((m) => (
                <McSelectItem
                  key={m.value}
                  value={m.value}
                  supportingText={showLabel ? m.username : undefined}
                >
                  {m.name}
                </McSelectItem>
              ))}
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>
    );
  },
};

export const IconLeading: Story = {
  render: ({ showLabel, scrollLabel }) => {
    const [value, setValue] = React.useState<string | null>(null);

    const selected = TEAM_MEMBERS.find((m) => m.value === value);

    return (
      <div>
        {showLabel && <McSelectLabel>Team member</McSelectLabel>}
        <McSelect value={value} onValueChange={setValue}>
          <McSelectTrigger variant="icon-leading" leadingIcon={<UserIcon />}>
            <McSelectValue placeholder="Select team member">
              {selected ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selected.name}</span>
                  {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
                </div>
              ) : null}
            </McSelectValue>
          </McSelectTrigger>
          <McSelectContent scrollbar={scrollLabel}>
            <McSelectGroup>
              <McSelectGroupLabel>Team members</McSelectGroupLabel>
              {TEAM_MEMBERS.map((m) => (
                <McSelectItem
                  key={m.value}
                  value={m.value}
                  leadingIcon={<UserIcon />}
                  supportingText={showLabel ? m.username : undefined}
                >
                  {m.name}
                </McSelectItem>
              ))}
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>
    );
  },
};

export const AvatarLeading: Story = {
  render: ({ showLabel, scrollLabel }) => {
    const [value, setValue] = React.useState<string | null>(null);

    const selected = TEAM_MEMBERS.find((m) => m.value === value);

    return (
      <div>
        {showLabel && <McSelectLabel>Team member</McSelectLabel>}
        <McSelect value={value} onValueChange={setValue}>
          <McSelectTrigger
            variant="avatar-leading"
            leadingAvatar={
              selected ? (
                <Avatar src={selected.avatar} alt={selected.name} />
              ) : (
                <UserIcon className="size-4 text-muted-foreground" />
              )
            }
          >
            <McSelectValue placeholder="Select team member">
              {selected ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selected.name}</span>
                  {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
                </div>
              ) : null}
            </McSelectValue>
          </McSelectTrigger>
          <McSelectContent scrollbar={scrollLabel}>
            <McSelectGroup>
              <McSelectGroupLabel>Team members</McSelectGroupLabel>
              {TEAM_MEMBERS.map((m) => (
                <McSelectItem
                  key={m.value}
                  value={m.value}
                  leadingAvatar={<Avatar src={m.avatar} alt={m.name} />}
                  supportingText={showLabel ? m.username : undefined}
                >
                  {m.name}
                </McSelectItem>
              ))}
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>
    );
  },
};

export const DotLeading: Story = {
  render: ({ showLabel, scrollLabel }) => {
    const [value, setValue] = React.useState<string | null>(null);
    const selected = TEAM_MEMBERS.find((m) => m.value === value);

    return (
      <div>
        {showLabel && <McSelectLabel>Status</McSelectLabel>}

        <McSelect value={value} onValueChange={setValue}>
          <McSelectTrigger variant="dot-leading" dotColor="bg-green-500">
            <McSelectValue placeholder="Select status">
              {selected ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selected.name}</span>
                  {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
                </div>
              ) : null}
            </McSelectValue>
          </McSelectTrigger>

          <McSelectContent scrollbar={scrollLabel}>
            <McSelectGroup>
              <McSelectGroupLabel>Status</McSelectGroupLabel>

              {TEAM_MEMBERS.map((m) => (
                <McSelectItem
                  key={m.value}
                  value={m.value}
                  dotColor="bg-green-500"
                  supportingText={showLabel ? m.username : undefined}
                >
                  {m.name}
                </McSelectItem>
              ))}
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>
    );
  },
};

export const Search: Story = {
  render: ({ showLabel, scrollLabel }) => {
    const [value, setValue] = React.useState<string | null>(null);
    const selected = TEAM_MEMBERS.find((m) => m.value === value);

    return (
      <div>
        {showLabel && <McSelectLabel>Search</McSelectLabel>}

        <McSelect value={value} onValueChange={setValue}>
          <McSelectTrigger variant="search">
            <McSelectValue placeholder="Search member">
              {selected ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selected.name}</span>
                  {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
                </div>
              ) : null}
            </McSelectValue>
          </McSelectTrigger>

          <McSelectContent scrollbar={scrollLabel}>
            <McSelectGroup>
              <McSelectGroupLabel>Team members</McSelectGroupLabel>

              {TEAM_MEMBERS.map((m) => (
                <McSelectItem
                  key={m.value}
                  value={m.value}
                  supportingText={showLabel ? m.username : undefined}
                >
                  {m.name}
                </McSelectItem>
              ))}
            </McSelectGroup>
          </McSelectContent>
        </McSelect>
      </div>
    );
  },
};
