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
    online: true,
  },
  {
    value: 'phoenix',
    name: 'Phoenix Baker',
    username: '@phoenix',
    online: false,
  },
  {
    value: 'lana',
    name: 'Lana Steiner',
    username: '@lana',
    online: true,
  },
  {
    value: 'demi',
    name: 'Demi Wilkinson',
    username: '@demi',
    online: false,
  },
  {
    value: 'candice',
    name: 'Candice Wu',
    username: '@candice',
    online: true,
  },
];

const MANY_TEAM_MEMBERS = Array.from({ length: 28 }, (_, index) => ({
  value: `member-${index + 1}`,
  name: `Member ${index + 1}`,
  username: `@member${index + 1}`,
  online: index % 2 === 0,
}));

const AVATAR_BACKGROUNDS = ['#FDE68A', '#BFDBFE', '#DDD6FE', '#FBCFE8', '#BBF7D0'];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const backgroundColor = AVATAR_BACKGROUNDS[name.length % AVATAR_BACKGROUNDS.length];

  return (
    <span
      aria-label={name}
      className="flex size-5 items-center justify-center rounded-full text-[10px] font-semibold text-slate-700"
      style={{ backgroundColor }}
    >
      {initials}
    </span>
  );
}

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

export const Default: Story = {
  render: ({ showLabel }) => {
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

          <McSelectContent>
            <McSelectGroup>
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

export const ManyOptions: Story = {
  render: ({ showLabel }) => {
    const [value, setValue] = React.useState<string | null>(null);
    const selected = MANY_TEAM_MEMBERS.find((m) => m.value === value);

    return (
      <div>
        {showLabel && <McSelectLabel>Team member</McSelectLabel>}

        <McSelect value={value} onValueChange={setValue}>
          <McSelectTrigger variant="default">
            <McSelectValue placeholder="Choose a team member">
              {selected ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selected.name}</span>
                  {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
                </div>
              ) : null}
            </McSelectValue>
          </McSelectTrigger>

          <McSelectContent scrollbar>
            <McSelectGroup>
              {MANY_TEAM_MEMBERS.map((m) => (
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
  render: ({ showLabel }) => {
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
          <McSelectContent>
            <McSelectGroup>
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
  render: ({ showLabel }) => {
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
                <Avatar name={selected.name} />
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
          <McSelectContent>
            <McSelectGroup>
              {TEAM_MEMBERS.map((m) => (
                <McSelectItem
                  key={m.value}
                  value={m.value}
                  leadingAvatar={<Avatar name={m.name} />}
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
  render: ({ showLabel }) => {
    const [value, setValue] = React.useState<string | null>(null);
    const selected = TEAM_MEMBERS.find((m) => m.value === value);
    const dotColor = selected?.online ? 'bg-green-500' : 'bg-slate-300';

    return (
      <div>
        {showLabel && <McSelectLabel>Status</McSelectLabel>}
        <McSelect value={value} onValueChange={setValue}>
          <McSelectTrigger variant="dot-leading" dotColor={dotColor}>
            <McSelectValue placeholder="Select status">
              {selected ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{selected.name}</span>
                  {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
                </div>
              ) : null}
            </McSelectValue>
          </McSelectTrigger>

          <McSelectContent>
            <McSelectGroup>
              <McSelectGroupLabel>Status</McSelectGroupLabel>

              {TEAM_MEMBERS.map((m) => (
                <McSelectItem
                  key={m.value}
                  value={m.value}
                  dotColor={m.online ? 'bg-green-500' : 'bg-slate-300'}
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

// export const Search: Story = {
//   render: ({ showLabel }) => {
//     const [value, setValue] = React.useState<string | null>(null);
//     const selected = TEAM_MEMBERS.find((m) => m.value === value);
//
//     return (
//       <div>
//         {showLabel && <McSelectLabel>Search</McSelectLabel>}
//
//         <McSelect value={value} onValueChange={setValue}>
//           <McSelectTrigger variant="search">
//             <McSelectValue placeholder="Search member">
//               {selected ? (
//                 <div className="flex items-center gap-2">
//                   <span className="font-medium">{selected.name}</span>
//                   {showLabel && <span className="text-muted-foreground">{selected.username}</span>}
//                 </div>
//               ) : null}
//             </McSelectValue>
//           </McSelectTrigger>
//
//           <McSelectContent>
//             <McSelectGroup>
//               {TEAM_MEMBERS.map((m) => (
//                 <McSelectItem
//                   key={m.value}
//                   value={m.value}
//                   supportingText={showLabel ? m.username : undefined}
//                 >
//                   {m.name}
//                 </McSelectItem>
//               ))}
//             </McSelectGroup>
//           </McSelectContent>
//         </McSelect>
//       </div>
//     );
//   },
// };
