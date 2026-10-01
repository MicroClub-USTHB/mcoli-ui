'use client';

import * as React from 'react';
import { PencilIcon, Trash2Icon } from 'lucide-react';

import { McAvatar, McAvatarFallback } from '@/registry/ui/mc-avatar';
import { McBadge } from '@/registry/ui/mc-badge';
import { McButton } from '@/registry/ui/mc-button';
import {
  createMcDataTableColumnHelper,
  McDataTable,
  McDataTableCard,
  McDataTableCellUser,
  McDataTableHeader,
} from '@/registry/ui/mc-data-table';

type Member = {
  id: string;
  name: string;
  username: string;
  status: 'Active' | 'Inactive';
  role: string;
  email: string;
  teams: string[];
};

const people = [
  ['Olivia Rhye', 'Product Designer'],
  ['Phoenix Baker', 'Product Manager'],
  ['Lana Steiner', 'Frontend Developer'],
  ['Demi Wilkinson', 'Backend Developer'],
  ['Candice Wu', 'Fullstack Developer'],
  ['Natali Craig', 'UX Designer'],
  ['Drew Cano', 'UX Copywriter'],
  ['Orlando Diggs', 'UI Designer'],
  ['Andi Lane', 'Product Manager'],
  ['Kate Morrison', 'QA Engineer'],
];

const members: Member[] = Array.from({ length: 50 }, (_, i) => {
  const [name, role] = people[i % people.length];
  const first = name.split(' ')[0].toLowerCase();
  return {
    id: String(i + 1),
    name,
    username: `@${first}`,
    status: i % 7 === 3 ? 'Inactive' : 'Active',
    role,
    email: `${first}@microclub.info`,
    teams: ['Design', 'Product', 'Marketing', 'Research', 'Ops'].slice(0, 2 + (i % 4)),
  };
});

const teamColors = [
  'bg-accent text-accent-foreground',
  'bg-warning-foreground text-warning',
  'bg-destructive-foreground text-destructive',
];

const helper = createMcDataTableColumnHelper<Member>();

const columns = helper.columns([
  helper.accessor('name', {
    header: 'Name',
    cell: ({ row }) => (
      <McDataTableCellUser
        avatar={
          <McAvatar size="md">
            <McAvatarFallback>
              {row.original.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </McAvatarFallback>
          </McAvatar>
        }
        title={row.original.name}
        subtitle={row.original.username}
      />
    ),
  }),
  helper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => {
      const active = getValue() === 'Active';
      return (
        <McBadge
          className={active ? 'bg-success-foreground text-success' : 'bg-muted text-foreground'}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {getValue()}
        </McBadge>
      );
    },
  }),
  helper.accessor('role', {
    header: 'Role',
    meta: { headerTooltip: 'The role this member holds in the club.' },
  }),
  helper.accessor('email', {
    header: 'Email address',
  }),
  helper.accessor('teams', {
    header: 'Teams',
    enableSorting: false,
    cell: ({ getValue }) => {
      const teams = getValue();
      return (
        <div className="flex items-center gap-1">
          {teams.slice(0, 3).map((team, i) => (
            <McBadge key={team} className={teamColors[i]}>
              {team}
            </McBadge>
          ))}
          {teams.length > 3 && (
            <McBadge className="bg-muted text-foreground">+{teams.length - 3}</McBadge>
          )}
        </div>
      );
    },
  }),
  helper.display({
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <McButton
          variant="tertiary"
          size="sm"
          icon="only"
          iconDefinition={<Trash2Icon className="size-4.5" />}
          className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={`Delete ${row.original.name}`}
        />
        <McButton
          variant="tertiary"
          size="sm"
          icon="only"
          iconDefinition={<PencilIcon className="size-4.5" />}
          className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={`Edit ${row.original.name}`}
        />
      </div>
    ),
  }),
]);

export default function McDataTableDemo() {
  return (
    <McDataTableCard>
      <McDataTableHeader title="Team members" badge={`${members.length} users`} />
      <McDataTable
        columns={columns}
        data={members}
        getRowId={(member) => member.id}
        enableRowSelection
      />
    </McDataTableCard>
  );
}
