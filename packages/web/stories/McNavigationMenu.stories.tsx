import type { ComponentProps, ComponentPropsWithoutRef } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Link from 'next/link';
import { CircleAlertIcon, CircleCheckIcon, CircleDashedIcon } from 'lucide-react';
import {
  McNavigationMenu,
  McNavigationMenuContent,
  McNavigationMenuItem,
  McNavigationMenuLink,
  McNavigationMenuList,
  McNavigationMenuTrigger,
} from '@/registry/ui/mc-navigation-menu';

type NavigationMenuStoryArgs = ComponentProps<typeof McNavigationMenu>;
type MenuComponent = {
  title: string;
  href: string;
  description: string;
};

const components: MenuComponent[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content known as tab panels that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description: 'A popup that displays information related to an element on focus or hover.',
  },
];

const meta = {
  title: 'Components/McNavigationMenu',
  component: McNavigationMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<NavigationMenuStoryArgs>;

export default meta;
type Story = StoryObj<NavigationMenuStoryArgs>;

function renderNavigationMenu(args: NavigationMenuStoryArgs) {
  return (
    <div className="flex w-full justify-center pt-8 pb-56">
      <McNavigationMenu {...args}>
        <McNavigationMenuList>
          <McNavigationMenuItem>
            <McNavigationMenuTrigger>Getting started</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, and lists.
                </ListItem>
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>

          <McNavigationMenuItem className="hidden md:flex">
            <McNavigationMenuTrigger>Components</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
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
              <ul className="grid w-50">
                <li>
                  <McNavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2">
                        <CircleAlertIcon />
                        Backlog
                      </Link>
                    }
                  />
                  <McNavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2">
                        <CircleDashedIcon />
                        To Do
                      </Link>
                    }
                  />
                  <McNavigationMenuLink
                    render={
                      <Link href="#" className="flex-row items-center gap-2">
                        <CircleCheckIcon />
                        Done
                      </Link>
                    }
                  />
                </li>
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>

          <McNavigationMenuItem className="hidden md:flex">
            <McNavigationMenuTrigger>List</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>
          <McNavigationMenuItem className="hidden md:flex">
            <McNavigationMenuTrigger>Simple</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>
          <McNavigationMenuItem className="hidden md:flex">
            <McNavigationMenuTrigger>With Icon</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>
        </McNavigationMenuList>
      </McNavigationMenu>
    </div>
  );
}

export const Playground: Story = {
  args: {
    align: 'end',
  },

  render: renderNavigationMenu,
};

function ListItem({
  title,
  children,
  href,
  ...props
}: ComponentPropsWithoutRef<'li'> & { href: string }) {
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
