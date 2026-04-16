import type { Meta, StoryObj } from '@storybook/nextjs';
import { BookOpen, Briefcase, ChevronsUpDown, Settings, Sparkles } from 'lucide-react';
import MCLogo from '@/components/MCLogo';
import {
  McSidebar,
  McSidebarContent,
  McSidebarFooter,
  McSidebarGroup,
  McSidebarGroupContent,
  McSidebarGroupLabel,
  McSidebarHeader,
  McSidebarInset,
  McSidebarCollapsible,
  McSidebarMenu,
  McSidebarMenuSubButton,
  McSidebarMenuSubItem,
  McSidebarTrigger,
  McSidebarRail,
  McSidebarSeparator,
  SidebarProvider,
  useSidebar,
} from '@/registry/ui/mc-sidebar';

type SidebarStoryArgs = {
  side: 'left' | 'right';
  variant: 'sidebar' | 'floating' | 'inset';
  collapsible: 'offcanvas' | 'icon' | 'none';
  defaultOpen: boolean;
  showTriggerButton: boolean;
};

const meta: Meta<SidebarStoryArgs> = {
  title: 'Components/McSidebar',
  component: McSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['left', 'right'],
    },
    variant: {
      control: 'radio',
      options: ['sidebar', 'floating', 'inset'],
    },
    collapsible: {
      control: 'radio',
      options: ['icon', 'offcanvas', 'none'],
    },
    defaultOpen: {
      control: 'boolean',
    },
    showTriggerButton: {
      control: 'boolean',
    },
  },
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
    defaultOpen: true,
    showTriggerButton: true,
  },
};

export default meta;
type Story = StoryObj<SidebarStoryArgs>;

const platformItems = [
  { label: 'Playground', icon: Sparkles },
  { label: 'Models', icon: Briefcase },
  { label: 'Documentation', icon: BookOpen },
  { label: 'API Reference', icon: Settings },
];

function SidebarScenario(args: SidebarStoryArgs) {
  return (
    <SidebarProvider
      defaultOpen={args.defaultOpen}
      style={
        {
          '--sidebar-width': '300px',
          width: '100dvw',
        } as React.CSSProperties
      }
    >
      <SidebarScenarioContent args={args} />
    </SidebarProvider>
  );
}

function SidebarScenarioContent({ args }: { args: SidebarStoryArgs }) {
  const { toggleSidebar } = useSidebar();
  const canToggleSidebar = args.collapsible !== 'none';

  return (
    <div
      className={`relative flex min-h-[44rem] w-full overflow-hidden rounded-xl bg-background ${args.side === 'right' ? 'flex-row-reverse' : ''}`}
    >
      {args.showTriggerButton && canToggleSidebar ? (
        <SidebarTriggerButton side={args.side} />
      ) : null}

      <McSidebar side={args.side} variant={args.variant} collapsible={args.collapsible}>
        <McSidebarHeader className="gap-2 p-3">
          {args.showTriggerButton ? (
            <div className="flex items-center justify-between rounded-md px-1 py-1 group-data-[collapsible=icon]:justify-center">
              <div className="flex items-center gap-2">
                <MCLogo size={34} className="text-sidebar-foreground shrink-0" />
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-semibold text-sidebar-foreground">Micro Club</p>
                  <p className="text-xs text-muted-foreground">Scientific club</p>
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
            </div>
          ) : canToggleSidebar ? (
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left transition-colors hover:bg-sidebar-accent/40 group-data-[collapsible=icon]:justify-center"
            >
              <div className="flex items-center gap-2">
                <MCLogo size={34} className="text-sidebar-foreground shrink-0" />
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-semibold text-sidebar-foreground">Micro Club</p>
                  <p className="text-xs text-muted-foreground">Scientific club</p>
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-md px-1 py-1 group-data-[collapsible=icon]:justify-center">
              <div className="flex items-center gap-2">
                <MCLogo size={34} className="text-sidebar-foreground shrink-0" />
                <div className="group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-semibold text-sidebar-foreground">Micro Club</p>
                  <p className="text-xs text-muted-foreground">Scientific club</p>
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
            </div>
          )}
        </McSidebarHeader>

        <McSidebarContent>
          <McSidebarGroup>
            <McSidebarGroupLabel>Platform</McSidebarGroupLabel>
            <McSidebarGroupContent className="h-auto">
              <McSidebarMenu>
                {platformItems.map((item, index) => {
                  const Icon = item.icon;
                  const withChildren = index === 0;

                  return (
                    <McSidebarCollapsible
                      key={item.label}
                      label={item.label}
                      icon={Icon}
                      tooltip={item.label}
                      defaultOpen={withChildren}
                    >
                      {withChildren ? (
                        <>
                          <McSidebarMenuSubItem>
                            <McSidebarMenuSubButton isActive>History</McSidebarMenuSubButton>
                          </McSidebarMenuSubItem>
                          <McSidebarMenuSubItem>
                            <McSidebarMenuSubButton>Starred</McSidebarMenuSubButton>
                          </McSidebarMenuSubItem>
                          <McSidebarMenuSubItem>
                            <McSidebarMenuSubButton>Settings</McSidebarMenuSubButton>
                          </McSidebarMenuSubItem>
                        </>
                      ) : null}
                    </McSidebarCollapsible>
                  );
                })}
              </McSidebarMenu>
            </McSidebarGroupContent>
          </McSidebarGroup>
        </McSidebarContent>

        <McSidebarSeparator />
        <McSidebarFooter>
          <div className="flex items-center justify-between rounded-md px-1 py-1 hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">micro@club.dev</p>
              <p className="truncate text-xs text-muted-foreground">Admin workspace</p>
            </div>
          </div>
        </McSidebarFooter>
        {canToggleSidebar ? <McSidebarRail /> : null}
      </McSidebar>

      <McSidebarInset className="p-6 pt-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Story Scenario</p>
          <h2 className="text-2xl font-semibold text-foreground">McSidebar</h2>
          <p className="text-sm text-muted-foreground">
            Utilise les controls Storybook pour tester les variantes, le mode de collapse, les
            badges, actions et sohhbnbbnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn hhhjjshjs shhhshbsb
            hhhsbxjjiicjjnx hhxxhhx us-menus.
          </p>
        </div>
      </McSidebarInset>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <SidebarScenario {...args} />,
};

export const SidebarVariants: Story = {
  render: () => (
    <div className="grid gap-6">
      <SidebarScenario
        side="left"
        variant="sidebar"
        collapsible="icon"
        defaultOpen
        showTriggerButton
      />
      <SidebarScenario
        side="left"
        variant="floating"
        collapsible="icon"
        defaultOpen
        showTriggerButton
      />
      <SidebarScenario
        side="left"
        variant="inset"
        collapsible="icon"
        defaultOpen
        showTriggerButton
      />
    </div>
  ),
};

export const CollapseModes: Story = {
  render: () => (
    <div className="grid gap-6">
      <SidebarScenario
        side="left"
        variant="sidebar"
        collapsible="icon"
        defaultOpen
        showTriggerButton
      />
      <SidebarScenario
        side="left"
        variant="sidebar"
        collapsible="offcanvas"
        defaultOpen
        showTriggerButton
      />
      <SidebarScenario
        side="left"
        variant="sidebar"
        collapsible="none"
        defaultOpen
        showTriggerButton={false}
      />
    </div>
  ),
};

export const RightSideAndMinimal: Story = {
  render: () => (
    <SidebarScenario
      side="right"
      variant="floating"
      collapsible="icon"
      defaultOpen
      showTriggerButton={false}
    />
  ),
};

export const WithTriggerButton: Story = {
  args: {
    collapsible: 'icon',
    defaultOpen: true,
    showTriggerButton: true,
  },
  render: (args) => <SidebarScenario {...args} />,
};

export const WithoutTriggerButton: Story = {
  args: {
    collapsible: 'icon',
    defaultOpen: true,
    showTriggerButton: false,
  },
  render: (args) => <SidebarScenario {...args} />,
};

function SidebarTriggerButton({ side }: { side: SidebarStoryArgs['side'] }) {
  const { state } = useSidebar();
  const offsetProperty = side === 'right' ? 'right' : 'left';
  const baseWidth = state === 'collapsed' ? 'var(--sidebar-width-icon)' : 'var(--sidebar-width)';
  const offsetValue = side === 'left' ? `calc(${baseWidth} + 26px )` : `calc(${baseWidth} + 26px)`;

  return (
    <McSidebarTrigger
      className="fixed top-6 z-50 size-8 bg-transparent text-sidebar-foreground shadow-none transition-colors hover:bg-transparent hover:text-sidebar-foreground active:text-sidebar-accent-foreground"
      style={{ [offsetProperty]: offsetValue } as React.CSSProperties}
    />
  );
}
