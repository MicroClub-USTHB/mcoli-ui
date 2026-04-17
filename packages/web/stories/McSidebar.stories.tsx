import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Bot,
  BookOpen,
  ChevronRight,
  ChevronsUpDown,
  CircleDashed,
  Compass,
  Grid2x2,
  MoreHorizontal,
  SlidersHorizontal,
  SquareTerminal,
  User,
} from 'lucide-react';
import MCLogo from '@/components/MCLogo';
import {
  McSidebar,
  McSidebarContent,
  McSidebarFooter,
  McSidebarGroup,
  McSidebarGroupContent,
  McSidebarGroupLabel,
  McSidebarHeader,
  McSidebarCollapsible,
  McSidebarMenu,
  McSidebarMenuButton,
  McSidebarMenuItem,
  McSidebarMenuSubButton,
  McSidebarMenuSubItem,
  McSidebarTrigger,
  McSidebarRail,
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
  { label: 'Playground', icon: SquareTerminal },
  { label: 'Models', icon: Bot },
  { label: 'Documentation', icon: BookOpen },
  { label: 'Settings', icon: SlidersHorizontal },
];

const projectItems = [
  { label: 'Design Engineering', icon: Grid2x2 },
  { label: 'Sales & Marketing', icon: CircleDashed },
  { label: 'Travel', icon: Compass },
  { label: 'More', icon: MoreHorizontal },
];

function SidebarScenario(args: SidebarStoryArgs) {
  return (
    <SidebarProvider
      defaultOpen={args.defaultOpen}
      style={
        {
          '--sidebar-width': '255px',
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
        <SidebarTriggerButton side={args.side} collapsible={args.collapsible} />
      ) : null}

      <McSidebar
        side={args.side}
        variant={args.variant}
        collapsible={args.collapsible}
        className="z-20"
      >
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
            <McSidebarGroupLabel className="font-sans font-normal not-italic text-sx leading-5 tracking-normal">
              Platform
            </McSidebarGroupLabel>
            <McSidebarGroupContent className="h-auto">
              <McSidebarMenu>
                <McSidebarCollapsible
                  label={platformItems[0].label}
                  icon={platformItems[0].icon}
                  tooltip={platformItems[0].label}
                  defaultOpen
                  triggerClassName="font-sans font-normal not-italic text-sm leading-5 tracking-normal"
                >
                  <McSidebarMenuSubItem>
                    <McSidebarMenuSubButton className="font-sans font-normal not-italic text-sm leading-5 tracking-normal">
                      History
                    </McSidebarMenuSubButton>
                  </McSidebarMenuSubItem>
                  <McSidebarMenuSubItem>
                    <McSidebarMenuSubButton className="font-sans font-normal not-italic text-sm leading-5 tracking-normal">
                      Starred
                    </McSidebarMenuSubButton>
                  </McSidebarMenuSubItem>
                  <McSidebarMenuSubItem>
                    <McSidebarMenuSubButton className="font-sans font-normal not-italic text-sm leading-5 tracking-normal">
                      Settings
                    </McSidebarMenuSubButton>
                  </McSidebarMenuSubItem>
                </McSidebarCollapsible>

                {platformItems.slice(1).map((item) => {
                  const Icon = item.icon;

                  return (
                    <McSidebarMenuItem key={item.label}>
                      <McSidebarMenuButton className="justify-between font-sans font-normal not-italic text-sm leading-5 tracking-normal">
                        <span className="flex items-center gap-2">
                          <Icon />
                          <span>{item.label}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 group-data-[collapsible=icon]:hidden" />
                      </McSidebarMenuButton>
                    </McSidebarMenuItem>
                  );
                })}
              </McSidebarMenu>
            </McSidebarGroupContent>
          </McSidebarGroup>

          {[0, 1].map((groupIndex) => (
            <McSidebarGroup key={groupIndex}>
              <McSidebarGroupLabel className="font-sans font-normal not-italic text-xs leading-5 tracking-normal">
                Projects
              </McSidebarGroupLabel>
              <McSidebarGroupContent className="h-auto">
                <McSidebarMenu>
                  {projectItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <McSidebarCollapsible
                        key={`${groupIndex}-${item.label}`}
                        label={item.label}
                        icon={Icon}
                        tooltip={item.label}
                        triggerClassName="font-sans font-normal not-italic text-sm leading-5 tracking-normal"
                      />
                    );
                  })}
                </McSidebarMenu>
              </McSidebarGroupContent>
            </McSidebarGroup>
          ))}
        </McSidebarContent>

        <McSidebarFooter>
          <div className="flex items-center justify-between rounded-md px-1 py-1 hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center">
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground">
                <User className="h-4 w-4" />
              </div>
              <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  micro@club.dev
                </p>
                <p className="truncate text-xs text-muted-foreground">Admin workspace</p>
              </div>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
          </div>
        </McSidebarFooter>
        {canToggleSidebar ? <McSidebarRail /> : null}
      </McSidebar>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <SidebarScenario {...args} />,
};

export const RightSideAndMinimal: Story = {
  render: () => (
    <SidebarScenario
      side="right"
      variant="floating"
      collapsible="icon"
      defaultOpen
      showTriggerButton
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

function SidebarTriggerButton({
  side,
  collapsible,
}: {
  side: SidebarStoryArgs['side'];
  collapsible: SidebarStoryArgs['collapsible'];
}) {
  const { state } = useSidebar();
  const offsetProperty = side === 'right' ? 'right' : 'left';
  const baseWidth =
    state === 'collapsed'
      ? collapsible === 'offcanvas'
        ? '0px'
        : 'var(--sidebar-width-icon)'
      : 'var(--sidebar-width)';
  const offsetValue = side === 'left' ? `calc(${baseWidth} + 26px )` : `calc(${baseWidth} + 26px)`;

  return (
    <McSidebarTrigger
      className="fixed top-6 z-50 size-8 bg-transparent text-sidebar-foreground shadow-none transition-colors hover:bg-transparent hover:text-sidebar-foreground active:text-sidebar-accent-foreground"
      style={{ [offsetProperty]: offsetValue } as React.CSSProperties}
    />
  );
}
