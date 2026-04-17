'use client';

import * as React from 'react';
import Link from 'next/link';
import { CircleAlertIcon, CircleCheckIcon, CircleDashedIcon } from 'lucide-react';

import {
  McNavigationMenu,
  McNavigationMenuContent,
  McNavigationMenuItem,
  McNavigationMenuLink,
  McNavigationMenuList,
  McNavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/mc-navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '#alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '#hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '#progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '#scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '#tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '#tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

export default function NavigationMenuDemo() {
  return (
    <div className="w-full flex justify-center py-10">
      <McNavigationMenu>
        <McNavigationMenuList>
          <McNavigationMenuItem>
            <McNavigationMenuTrigger>Getting started</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="w-96">
                <ListItem href="#docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="#installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>
          <McNavigationMenuItem className="hidden md:flex">
            <McNavigationMenuTrigger>Components</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>
          <McNavigationMenuItem>
            <McNavigationMenuTrigger>With Icon</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="grid w-[200px]">
                <li>
                  <McNavigationMenuLink
                    render={
                      <Link href="#" className="flex items-center gap-2">
                        <CircleAlertIcon />
                        Backlog
                      </Link>
                    }
                  />
                  <McNavigationMenuLink
                    render={
                      <Link href="#" className="flex items-center gap-2">
                        <CircleDashedIcon />
                        To Do
                      </Link>
                    }
                  />
                  <McNavigationMenuLink
                    render={
                      <Link href="#" className="flex items-center gap-2">
                        <CircleCheckIcon />
                        Done
                      </Link>
                    }
                  />
                </li>
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>
          <McNavigationMenuItem>
            <McNavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={<Link href="#docs">Docs</Link>}
            />
          </McNavigationMenuItem>
        </McNavigationMenuList>
      </McNavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <McNavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">{children}</div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
