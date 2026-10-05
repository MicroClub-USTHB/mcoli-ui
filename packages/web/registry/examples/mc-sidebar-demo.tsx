'use client';

import {
  Bot,
  BookOpen,
  ChevronsUpDown,
  Frame,
  Map,
  MoreHorizontal,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import {
  McSidebar,
  McSidebarCollapsible,
  McSidebarContent,
  McSidebarFade,
  McSidebarFooter,
  McSidebarGroup,
  McSidebarGroupContent,
  McSidebarGroupLabel,
  McSidebarHeader,
  McSidebarInset,
  McSidebarMenu,
  McSidebarMenuButton,
  McSidebarMenuItem,
  McSidebarMenuSubButton,
  McSidebarMenuSubItem,
  McSidebarProvider,
  McSidebarRail,
  McSidebarTrigger,
} from '../ui/mc-sidebar';

const platformItems = [
  { label: 'Playground', icon: SquareTerminal, items: ['History', 'Starred', 'Settings'] },
  { label: 'Models', icon: Bot, items: ['Genesis', 'Explorer', 'Quantum'] },
  { label: 'Documentation', icon: BookOpen, items: ['Introduction', 'Get Started', 'Tutorials'] },
  { label: 'Settings', icon: Settings2, items: ['General', 'Team', 'Billing'] },
];

const projectItems = [
  { label: 'Design Engineering', icon: Frame },
  { label: 'Sales & Marketing', icon: PieChart },
  { label: 'Travel', icon: Map },
  { label: 'More', icon: MoreHorizontal },
];

export function McSidebarDemoLayout({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'icon',
}: {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  return (
    <>
      <McSidebar
        side={side}
        variant={variant}
        collapsible={collapsible}
        className="h-[calc(100%-2.5rem)]"
      >
        <McSidebarHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-[35px] shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              MC
            </div>
            <McSidebarFade className="flex flex-1 items-center gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-5 font-semibold">Micro Club</p>
                <p className="text-xs leading-4">Scientific club</p>
              </div>
              <ChevronsUpDown className="size-4 shrink-0" />
            </McSidebarFade>
          </div>
        </McSidebarHeader>

        <McSidebarContent>
          <McSidebarGroup>
            <McSidebarGroupLabel>Platform</McSidebarGroupLabel>
            <McSidebarGroupContent>
              <McSidebarMenu>
                {platformItems.map((item, index) => (
                  <McSidebarCollapsible
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    tooltip={item.label}
                    defaultOpen={index === 0}
                  >
                    {item.items.map((subItem) => (
                      <McSidebarMenuSubItem key={subItem}>
                        <McSidebarMenuSubButton href="#">{subItem}</McSidebarMenuSubButton>
                      </McSidebarMenuSubItem>
                    ))}
                  </McSidebarCollapsible>
                ))}
              </McSidebarMenu>
            </McSidebarGroupContent>
          </McSidebarGroup>

          <McSidebarGroup>
            <McSidebarGroupLabel>Projects</McSidebarGroupLabel>
            <McSidebarGroupContent>
              <McSidebarMenu>
                {projectItems.map((item) => (
                  <McSidebarMenuItem key={item.label}>
                    <McSidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </McSidebarMenuButton>
                  </McSidebarMenuItem>
                ))}
              </McSidebarMenu>
            </McSidebarGroupContent>
          </McSidebarGroup>
        </McSidebarContent>

        <McSidebarFooter>
          <div className="flex items-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-xs font-medium text-sidebar-accent-foreground">
              MC
            </div>
            <McSidebarFade className="flex flex-1 items-center gap-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm leading-5 font-semibold">MC</p>
                <p className="truncate text-xs leading-4">micro@gmail.com</p>
              </div>
              <ChevronsUpDown className="size-4 shrink-0" />
            </McSidebarFade>
          </div>
        </McSidebarFooter>

        {collapsible !== 'none' ? <McSidebarRail /> : null}
      </McSidebar>

      <McSidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          {collapsible !== 'none' ? <McSidebarTrigger /> : null}
          <p className="text-sm font-medium">Preview</p>
        </header>
        <div className="p-4 text-sm text-muted-foreground">
          Use the button or press Cmd/Ctrl + B to collapse the sidebar.
        </div>
      </McSidebarInset>
    </>
  );
}

export default function McSidebarDemo() {
  return (
    <McSidebarProvider className="relative h-[28rem] min-h-0 overflow-hidden rounded-xl border [transform:translateZ(0)]">
      <McSidebarDemoLayout />
    </McSidebarProvider>
  );
}
