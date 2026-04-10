import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  McBreadcrumb,
  McBreadcrumbEllipsis,
  McBreadcrumbItem,
  McBreadcrumbLink,
  McBreadcrumbList,
  McBreadcrumbPage,
  McBreadcrumbSeparator,
} from '@/registry/ui/mc-breadcrumb';

type BreadcrumbStoryArgs = ComponentProps<typeof McBreadcrumb> & {
  showEllipsis: boolean;
};

const meta = {
  title: 'Components/McBreadcrumb',
  component: McBreadcrumb,
  argTypes: {
    showEllipsis: {
      control: 'boolean',
    },
  },
  args: {
    showEllipsis: false,
  },
} satisfies Meta<BreadcrumbStoryArgs>;

export default meta;
type Story = StoryObj<BreadcrumbStoryArgs>;

export const Playground: Story = {
  render: ({ showEllipsis }) => (
    <McBreadcrumb>
      <McBreadcrumbList>
        <McBreadcrumbItem>
          <McBreadcrumbLink href="/">Home</McBreadcrumbLink>
        </McBreadcrumbItem>
        <McBreadcrumbSeparator />
        {showEllipsis ? (
          <>
            <McBreadcrumbItem>
              <McBreadcrumbEllipsis />
            </McBreadcrumbItem>
            <McBreadcrumbSeparator />
          </>
        ) : null}
        <McBreadcrumbItem>
          <McBreadcrumbLink href="/components">Components</McBreadcrumbLink>
        </McBreadcrumbItem>
        <McBreadcrumbSeparator />
        <McBreadcrumbItem>
          <McBreadcrumbPage>Breadcrumb</McBreadcrumbPage>
        </McBreadcrumbItem>
      </McBreadcrumbList>
    </McBreadcrumb>
  ),
};

export const Default: Story = {
  render: () => (
    <McBreadcrumb>
      <McBreadcrumbList>
        <McBreadcrumbItem>
          <McBreadcrumbLink href="/">Home</McBreadcrumbLink>
        </McBreadcrumbItem>
        <McBreadcrumbSeparator />
        <McBreadcrumbItem>
          <McBreadcrumbLink href="/components">Components</McBreadcrumbLink>
        </McBreadcrumbItem>
        <McBreadcrumbSeparator />
        <McBreadcrumbItem>
          <McBreadcrumbPage>Breadcrumb</McBreadcrumbPage>
        </McBreadcrumbItem>
      </McBreadcrumbList>
    </McBreadcrumb>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <McBreadcrumb>
      <McBreadcrumbList>
        <McBreadcrumbItem>
          <McBreadcrumbLink href="/">Home</McBreadcrumbLink>
        </McBreadcrumbItem>
        <McBreadcrumbSeparator />
        <McBreadcrumbItem>
          <McBreadcrumbEllipsis />
        </McBreadcrumbItem>
        <McBreadcrumbSeparator />
        <McBreadcrumbItem>
          <McBreadcrumbLink href="/components">Components</McBreadcrumbLink>
        </McBreadcrumbItem>
        <McBreadcrumbSeparator />
        <McBreadcrumbItem>
          <McBreadcrumbPage>Breadcrumb</McBreadcrumbPage>
        </McBreadcrumbItem>
      </McBreadcrumbList>
    </McBreadcrumb>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <McBreadcrumb>
        <McBreadcrumbList>
          <McBreadcrumbItem>
            <McBreadcrumbLink href="/">Home</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbLink href="/components">Components</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbPage>Breadcrumb</McBreadcrumbPage>
          </McBreadcrumbItem>
        </McBreadcrumbList>
      </McBreadcrumb>

      <McBreadcrumb>
        <McBreadcrumbList>
          <McBreadcrumbItem>
            <McBreadcrumbLink href="/">Home</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbEllipsis />
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbLink href="/components">Components</McBreadcrumbLink>
          </McBreadcrumbItem>
          <McBreadcrumbSeparator />
          <McBreadcrumbItem>
            <McBreadcrumbPage>Breadcrumb</McBreadcrumbPage>
          </McBreadcrumbItem>
        </McBreadcrumbList>
      </McBreadcrumb>
    </div>
  ),
};
