'use client';

import { useState } from 'react';

import { BookOpen, Briefcase, ChevronsUpDown, Settings, Sparkles, User } from 'lucide-react';
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
  McSidebarRail,
  McSidebarTrigger,
  SidebarProvider,
  useSidebar,
} from '../ui/mc-sidebar';

const platformItems = [
  { label: 'Playground', icon: Sparkles },
  { label: 'Models', icon: Briefcase },
  { label: 'Documentation', icon: BookOpen },
  { label: 'API Reference', icon: Settings },
];

export default function McSidebarDemo() {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
      className="!h-[24rem] !min-h-0 !w-full overflow-hidden"
      style={
        {
          '--sidebar-width': '255px',
        } as React.CSSProperties
      }
    >
      <SidebarDemoContent />
    </SidebarProvider>
  );
}

function SidebarTriggerButton() {
  const { state } = useSidebar();
  const baseWidth = state === 'collapsed' ? 'var(--sidebar-width-icon)' : 'var(--sidebar-width)';
  const offsetValue = `calc(${baseWidth} + 26px)`;

  return (
    <McSidebarTrigger
      className="absolute top-6 z-50 size-8 bg-transparent text-sidebar-foreground shadow-none transition-colors hover:bg-transparent hover:text-sidebar-foreground active:text-sidebar-accent-foreground"
      style={{ left: offsetValue } as React.CSSProperties}
    />
  );
}

function SidebarDemoContent() {
  return (
    <div className="relative flex h-full min-h-0 w-full rounded-xl bg-background [&_[data-slot=sidebar-gap]]:hidden overflow-visible">
      <SidebarTriggerButton />
      <McSidebar
        side="left"
        variant="sidebar"
        collapsible="icon"
        className="!absolute !top-0 !left-0 !flex !h-full !w-[var(--sidebar-width)] group-data-[collapsible=icon]:!w-[var(--sidebar-width-icon)] [&_[data-slot=sidebar-container]]:!h-[24rem]"
      >
        <McSidebarHeader className="gap-2 p-2">
          <div className="flex items-center justify-between rounded-md px-1 py-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pt-4 group-data-[collapsible=icon]:pb-1">
            <div className="flex items-center gap-2">
              <MCLogo size={34} className="shrink-0 text-sidebar-foreground" />
              <div className="group-data-[collapsible=icon]:hidden gap-0.5">
                <p className="text-sm font-semibold text-sidebar-foreground">Micro Club</p>
                <p className="text-xs text-muted-foreground">Scientific club</p>
              </div>
            </div>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </div>
        </McSidebarHeader>

        <McSidebarContent>
          <McSidebarGroup className="p-1.5 group-data-[collapsible=icon]:p-1">
            <McSidebarGroupLabel className="h-6 px-1.5 text-[11px]">Platform</McSidebarGroupLabel>
            <McSidebarGroupContent className="h-auto">
              <McSidebarMenu className="gap-0.5">
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
                      triggerClassName="h-7 p-1.5"
                      contentClassName="mx-2 mt-0.5 gap-0.5 px-1.5 py-0"
                    >
                      {withChildren ? (
                        <>
                          <McSidebarMenuSubItem>
                            <McSidebarMenuSubButton
                              href="#"
                              className="h-6 px-1.5 no-underline hover:no-underline"
                            >
                              History
                            </McSidebarMenuSubButton>
                          </McSidebarMenuSubItem>
                          <McSidebarMenuSubItem>
                            <McSidebarMenuSubButton
                              href="#"
                              className="h-6 px-1.5 no-underline hover:no-underline"
                            >
                              Starred
                            </McSidebarMenuSubButton>
                          </McSidebarMenuSubItem>
                          <McSidebarMenuSubItem>
                            <McSidebarMenuSubButton
                              href="#"
                              className="h-6 px-1.5 no-underline hover:no-underline"
                            >
                              Settings
                            </McSidebarMenuSubButton>
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

        <McSidebarFooter className="mt-auto mb-6 gap-0 border-t border-sidebar-border p-2">
          <div className="flex w-full max-w-full items-center gap-2 rounded-md px-1 py-1 hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0 space-y-0.5 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">micro@club.dev</p>
              <p className="text-xs text-muted-foreground">Admin workspace</p>
            </div>
            <p className="hidden text-xs font-medium text-sidebar-foreground group-data-[collapsible=icon]:block">
              Admin
            </p>
          </div>
        </McSidebarFooter>

        <McSidebarRail />
      </McSidebar>

      <McSidebarInset className="flex min-h-0 flex-1 flex-col pl-[calc(var(--sidebar-width)+3.5rem)] group-data-[state=collapsed]/sidebar-wrapper:pl-[calc(var(--sidebar-width-icon)+3.5rem)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 pt-4 pb-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="space-y-0">
            <p className="text-sm text-muted-foreground">Preview</p>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-foreground">McSidebar</h3>
              <ChevronsUpDown className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto px-4 py-4">
          <p className="max-w-sm text-sm text-muted-foreground">
            Demo synchronise avec la story pour montrer le header, le contenu et le footer dans la
            preview de la documentation.
          </p>
        </div>
        <div className="mt-auto shrink-0 border-t border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-xs text-muted-foreground">Footer preview</p>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              Action
            </button>
          </div>
        </div>
      </McSidebarInset>
    </div>
  );
}
