import type { Meta, StoryObj } from '@storybook/nextjs';
import * as React from 'react';
import {
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  FileTextIcon,
  FilterIcon,
  MoreVerticalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UploadCloudIcon,
} from 'lucide-react';

import { McAvatar, McAvatarFallback } from '@/registry/ui/mc-avatar';
import { McBadge } from '@/registry/ui/mc-badge';
import { McButton } from '@/registry/ui/mc-button';
import {
  createMcDataTableColumnHelper,
  McDataTable,
  McDataTableCard,
  McDataTableCellUser,
  McDataTableEmpty,
  McDataTableHeader,
  McDataTableToolbar,
  type McDataTablePaginationVariant,
} from '@/registry/ui/mc-data-table';
import { McInput } from '@/registry/ui/mc-input';
import { McTabs, McTabsList, McTabsTrigger } from '@/registry/ui/mc-tabs';

// ==========================================
// DATA
// ==========================================

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

const members: Member[] = Array.from({ length: 100 }, (_, i) => {
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

type Vendor = {
  id: string;
  name: string;
  domain: string;
  rating: number;
  change: number;
  lastAssessed: Date;
  monitored: boolean;
};

const vendorSeed = [
  ['Catalog', 'catalogapp.io', 60, 5, '2025-01-22', true],
  ['Circooles', 'getcirooles.com', 72, -4, '2025-01-20', false],
  ['Command+R', 'cmdr.ai', 78, 6, '2025-01-24', true],
  ['Hourglass', 'hourglass.app', 38, 8, '2025-01-26', false],
  ['Layers', 'getlayers.io', 42, -1, '2025-01-18', true],
  ['Quotient', 'quotient.co', 66, -6, '2025-01-28', false],
  ['Sisyphus', 'sisyphus.com', 91, 2, '2025-01-16', true],
];

const vendors: Vendor[] = Array.from({ length: 5 }, (_, round) =>
  vendorSeed.map(([name, domain, rating, change, date, monitored], i) => ({
    id: `${round}-${i}`,
    name: name as string,
    domain: domain as string,
    rating: Math.min(100, (rating as number) + round * 3),
    change: change as number,
    lastAssessed: new Date(date as string),
    monitored: monitored as boolean,
  }))
).flat();

type FileRow = { id: string; name: string; size: string; uploaded: string; uploadedBy: string };

const files: FileRow[] = [
  ['Tech requirements.pdf', '200 KB'],
  ['Dashboard screenshot.jpg', '720 KB'],
  ['Dashboard prototype recording.mp4', '16 MB'],
  ['Dashboard prototype FINAL.fig', '4.2 MB'],
  ['UX Design Guidelines.docx', '400 KB'],
  ['Dashboard interaction.aep', '12 MB'],
  ['App inspiration.png', '800 KB'],
].map(([name, size], i) => ({
  id: String(i),
  name,
  size,
  uploaded: `Jan ${4 + i}, 2025`,
  uploadedBy: people[i][0],
}));

// ==========================================
// CELLS
// ==========================================

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <McBadge className={active ? 'bg-success-foreground text-success' : 'bg-muted text-foreground'}>
      <span className="size-1.5 rounded-full bg-current" />
      {active ? 'Active' : 'Inactive'}
    </McBadge>
  );
}

const tagColors = [
  'bg-accent text-accent-foreground',
  'bg-warning-foreground text-warning',
  'bg-destructive-foreground text-destructive',
];

function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-1">
      {items.slice(0, 3).map((item, i) => (
        <McBadge key={item} className={tagColors[i]}>
          {item}
        </McBadge>
      ))}
      {items.length > 3 && (
        <McBadge className="bg-muted text-foreground">+{items.length - 3}</McBadge>
      )}
    </div>
  );
}

function RowActions({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <McButton
        variant="tertiary"
        size="sm"
        icon="only"
        iconDefinition={<Trash2Icon className="size-4.5" />}
        className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label={`Delete ${label}`}
      />
      <McButton
        variant="tertiary"
        size="sm"
        icon="only"
        iconDefinition={<PencilIcon className="size-4.5" />}
        className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label={`Edit ${label}`}
      />
    </div>
  );
}

// ==========================================
// COLUMNS
// ==========================================

const memberHelper = createMcDataTableColumnHelper<Member>();

const memberColumns = memberHelper.columns([
  memberHelper.accessor('name', {
    header: 'Name',
    cell: ({ row }) => (
      <McDataTableCellUser
        avatar={
          <McAvatar size="md">
            <McAvatarFallback>{initials(row.original.name)}</McAvatarFallback>
          </McAvatar>
        }
        title={row.original.name}
        subtitle={row.original.username}
      />
    ),
  }),
  memberHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge active={getValue() === 'Active'} />,
  }),
  memberHelper.accessor('role', {
    header: 'Role',
    meta: { headerTooltip: 'The role this member holds in the club.' },
  }),
  memberHelper.accessor('email', { header: 'Email address' }),
  memberHelper.accessor('teams', {
    header: 'Teams',
    enableSorting: false,
    cell: ({ getValue }) => <Tags items={getValue()} />,
  }),
  memberHelper.display({
    id: 'actions',
    cell: ({ row }) => <RowActions label={row.original.name} />,
  }),
]);

const vendorHelper = createMcDataTableColumnHelper<Vendor>();

const vendorColumns = vendorHelper.columns([
  vendorHelper.accessor('name', {
    header: 'Vendor',
    cell: ({ row }) => (
      <McDataTableCellUser
        avatar={
          <McAvatar size="md">
            <McAvatarFallback>{row.original.name[0]}</McAvatarFallback>
          </McAvatar>
        }
        title={row.original.name}
        subtitle={row.original.domain}
      />
    ),
  }),
  vendorHelper.accessor('rating', {
    header: 'Rating',
    cell: ({ row }) => {
      const { rating, change } = row.original;
      const up = change >= 0;
      return (
        <div className="flex items-center gap-3">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${rating}%` }} />
          </div>
          <span className="text-sm font-medium text-foreground">{rating}</span>
          <McBadge
            className={
              up
                ? 'bg-success-foreground text-success'
                : 'bg-destructive-foreground text-destructive'
            }
          >
            {up ? <ArrowUpIcon className="size-3" /> : <ArrowDownIcon className="size-3" />}
            {Math.abs(change)}%
          </McBadge>
        </div>
      );
    },
  }),
  vendorHelper.accessor('lastAssessed', {
    header: 'Last assessed',
    cell: ({ getValue }) =>
      getValue().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  }),
  vendorHelper.accessor('monitored', {
    header: 'License use',
    enableSorting: false,
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1">
        <StatusBadge active={getValue()} />
        <Tags items={['Customer data', 'Admin']} />
      </div>
    ),
  }),
  vendorHelper.display({
    id: 'actions',
    cell: ({ row }) => <RowActions label={row.original.name} />,
  }),
]);

const fileHelper = createMcDataTableColumnHelper<FileRow>();

const fileColumns = fileHelper.columns([
  fileHelper.accessor('name', {
    header: 'File name',
    cell: ({ row }) => (
      <McDataTableCellUser
        avatar={
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-primary">
            <FileTextIcon className="size-5" />
          </div>
        }
        title={row.original.name}
        subtitle={row.original.size}
      />
    ),
  }),
  fileHelper.accessor('size', { header: 'File size' }),
  fileHelper.accessor('uploaded', { header: 'Date uploaded' }),
  fileHelper.accessor('uploadedBy', { header: 'Uploaded by' }),
  fileHelper.display({
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-end">
        <McButton
          variant="tertiary"
          size="sm"
          icon="only"
          iconDefinition={<MoreVerticalIcon className="size-4.5" />}
          className="bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={`More actions for ${row.original.name}`}
        />
      </div>
    ),
  }),
]);

// ==========================================
// META
// ==========================================

interface McDataTableStoryArgs {
  pagination: McDataTablePaginationVariant | false;
  pageSize: number;
  enableRowSelection: boolean;
}

const meta: Meta<McDataTableStoryArgs> = {
  title: 'Components/McDataTable',
  tags: ['autodocs'],
  argTypes: {
    pagination: {
      control: 'select',
      options: ['numbered', 'compact', 'minimal', false],
      description: 'Pagination footer style, or false to show every row',
    },
    pageSize: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Rows per page',
    },
    enableRowSelection: {
      control: 'boolean',
      description: 'Show row selection checkboxes in the first column',
    },
  },
  args: {
    pagination: 'numbered',
    pageSize: 10,
    enableRowSelection: true,
  },
  parameters: {
    layout: 'padded',
  },
  // the global theme decorator caps stories at 400px; tables need room
  decorators: [
    (Story) => (
      <div className="w-[calc(100vw-2rem)] max-w-6xl bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<McDataTableStoryArgs>;

// ==========================================
// STORIES
// ==========================================

export const TeamMembers: Story = {
  render: (args) => (
    <McDataTableCard>
      <McDataTableHeader title="Team members" badge={`${members.length} users`} />
      <McDataTable
        key={`${args.pagination}-${args.pageSize}`}
        columns={memberColumns}
        data={members}
        getRowId={(member) => member.id}
        enableRowSelection={args.enableRowSelection}
        pagination={args.pagination}
        pageSize={args.pageSize}
      />
    </McDataTableCard>
  ),
};

function VendorMovements(args: McDataTableStoryArgs) {
  const [search, setSearch] = React.useState('');
  const [tab, setTab] = React.useState('all');

  const data = React.useMemo(
    () => (tab === 'monitored' ? vendors.filter((vendor) => vendor.monitored) : vendors),
    [tab]
  );

  return (
    <McDataTableCard>
      <McDataTableHeader
        title="Vendor movements"
        badge={`${vendors.length} vendors`}
        description="Keep track of vendors and their security ratings."
        actions={
          <>
            <McButton
              variant="secondary"
              size="sm"
              icon="leading"
              iconDefinition={<UploadCloudIcon />}
            >
              Import
            </McButton>
            <McButton variant="primary" size="sm" icon="leading" iconDefinition={<PlusIcon />}>
              Add vendor
            </McButton>
          </>
        }
      />
      <McDataTableToolbar>
        <McTabs value={tab} onValueChange={(value) => setTab(String(value))}>
          <McTabsList>
            <McTabsTrigger value="all">View all</McTabsTrigger>
            <McTabsTrigger value="monitored">Monitored</McTabsTrigger>
          </McTabsList>
        </McTabs>
        <div className="flex items-center gap-3">
          <McInput
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            addonStart={<SearchIcon className="size-4" />}
            className="md:w-80"
          />
          <McButton variant="secondary" size="sm" icon="leading" iconDefinition={<FilterIcon />}>
            Filters
          </McButton>
        </div>
      </McDataTableToolbar>
      <McDataTable
        key={`${args.pagination}-${args.pageSize}`}
        columns={vendorColumns}
        data={data}
        getRowId={(vendor) => vendor.id}
        globalFilter={search}
        enableRowSelection={args.enableRowSelection}
        pagination={args.pagination}
        pageSize={args.pageSize}
        empty={
          <McDataTableEmpty
            icon={<SearchIcon />}
            title="No vendors found"
            description={`Your search "${search}" did not match any vendors. Please try again or add a new vendor.`}
            actions={
              <>
                <McButton variant="secondary" size="sm" onClick={() => setSearch('')}>
                  Clear search
                </McButton>
                <McButton variant="primary" size="sm" icon="leading" iconDefinition={<PlusIcon />}>
                  Add vendor
                </McButton>
              </>
            }
          />
        }
      />
    </McDataTableCard>
  );
}

export const WithToolbarAndSearch: Story = {
  args: { pagination: 'compact', pageSize: 7 },
  render: (args) => <VendorMovements {...args} />,
};

export const FilesUploaded: Story = {
  args: { pagination: false, enableRowSelection: true },
  render: (args) => (
    <McDataTableCard>
      <McDataTableHeader
        title="Files uploaded"
        actions={
          <>
            <McButton variant="secondary" size="sm">
              Download all
            </McButton>
            <McButton
              variant="primary"
              size="sm"
              icon="leading"
              iconDefinition={<UploadCloudIcon />}
            >
              Upload
            </McButton>
          </>
        }
      />
      <McDataTable
        columns={fileColumns}
        data={files}
        getRowId={(file) => file.id}
        enableRowSelection={args.enableRowSelection}
        pagination={args.pagination}
      />
    </McDataTableCard>
  ),
};

export const MinimalPagination: Story = {
  args: { pagination: 'minimal', enableRowSelection: false },
  render: (args) => (
    <McDataTableCard className="max-w-md">
      <McDataTableHeader title="Team members" badge={`${members.length} users`} />
      <McDataTable
        columns={memberColumns.slice(0, 2)}
        data={members}
        getRowId={(member) => member.id}
        enableRowSelection={args.enableRowSelection}
        pagination={args.pagination}
        pageSize={args.pageSize}
      />
    </McDataTableCard>
  ),
};

export const EmptyState: Story = {
  args: { pagination: false, enableRowSelection: false },
  render: (args) => (
    <McDataTableCard>
      <McDataTableHeader
        title="My projects"
        actions={
          <McButton variant="primary" size="sm" icon="leading" iconDefinition={<UploadCloudIcon />}>
            Upload
          </McButton>
        }
      />
      <McDataTable
        columns={fileColumns}
        data={[]}
        pagination={args.pagination}
        empty={
          <McDataTableEmpty
            icon={<UploadCloudIcon />}
            title="Start by uploading a file"
            description="Any assets used in projects will live here. Start creating by uploading your files."
            actions={
              <>
                <McButton variant="secondary" size="sm">
                  Support article
                </McButton>
                <McButton
                  variant="primary"
                  size="sm"
                  icon="leading"
                  iconDefinition={<UploadCloudIcon />}
                >
                  Upload
                </McButton>
              </>
            }
          />
        }
      />
    </McDataTableCard>
  ),
};

export const ErrorState: Story = {
  args: { pagination: false, enableRowSelection: false },
  render: () => (
    <McDataTableCard>
      <McDataTableHeader title="Team members" badge={`${members.length} users`} />
      <McDataTableEmpty
        icon={<AlertTriangleIcon className="text-warning" />}
        title="Something went wrong..."
        description="We had some trouble loading this page. Please refresh the page to try again or get in touch if the problem sticks around!"
        actions={
          <>
            <McButton variant="secondary" size="sm">
              Contact support
            </McButton>
            <McButton variant="primary" size="sm">
              Refresh page
            </McButton>
          </>
        }
      />
    </McDataTableCard>
  ),
};
