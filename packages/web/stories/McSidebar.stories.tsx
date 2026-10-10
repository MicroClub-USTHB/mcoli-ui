import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';
import { McSidebarDemoLayout } from '@/registry/examples/mc-sidebar-demo';
import { McSidebar, McSidebarProvider } from '@/registry/ui/mc-sidebar';

type SidebarStoryArgs = {
  side: 'left' | 'right';
  variant: 'sidebar' | 'floating' | 'inset';
  collapsible: 'offcanvas' | 'icon' | 'none';
  open: boolean;
};

const meta: Meta<SidebarStoryArgs> = {
  title: 'Components/McSidebar',
  component: McSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    side: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
    variant: {
      control: 'inline-radio',
      options: ['sidebar', 'floating', 'inset'],
    },
    collapsible: {
      control: 'inline-radio',
      options: ['icon', 'offcanvas', 'none'],
      description: 'How the sidebar collapses: to an icon rail, off the screen, or not at all.',
    },
    open: {
      control: 'boolean',
      description: 'Expanded when true, collapsed when false.',
    },
  },
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
    open: true,
  },
};

export default meta;
type Story = StoryObj<SidebarStoryArgs>;

function SidebarScenario({ side, variant, collapsible, open: openArg }: SidebarStoryArgs) {
  const [open, setOpen] = useState(openArg);

  useEffect(() => {
    setOpen(openArg);
  }, [openArg]);

  return (
    <McSidebarProvider
      open={open}
      onOpenChange={setOpen}
      className={`relative h-[44rem] min-h-0 w-screen overflow-hidden [transform:translateZ(0)] ${side === 'right' ? 'flex-row-reverse' : ''}`}
    >
      <McSidebarDemoLayout side={side} variant={variant} collapsible={collapsible} />
    </McSidebarProvider>
  );
}

export const Playground: Story = {
  render: (args) => <SidebarScenario {...args} />,
};

export const Expanded: Story = {
  parameters: { controls: { exclude: ['open'] } },
  args: { open: true },
  render: (args) => <SidebarScenario {...args} />,
};

export const Collapsed: Story = {
  parameters: { controls: { exclude: ['open'] } },
  args: { open: false },
  render: (args) => <SidebarScenario {...args} />,
};

export const RightSide: Story = {
  parameters: { controls: { exclude: ['side'] } },
  args: { side: 'right' },
  render: (args) => <SidebarScenario {...args} />,
};

export const Offcanvas: Story = {
  parameters: { controls: { exclude: ['collapsible'] } },
  args: { collapsible: 'offcanvas' },
  render: (args) => <SidebarScenario {...args} />,
};
