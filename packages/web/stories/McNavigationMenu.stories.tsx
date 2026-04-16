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

const meta: Meta<typeof McNavigationMenu> = {
  title: 'Components/McNavigationMenu',
  component: McNavigationMenu,
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Controls the alignment of the popup content',
    },
  },
  args: {
    align: 'start',
  },
};

export default meta;
type Story = StoryObj<typeof McNavigationMenu>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex w-full justify-center py-10">
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
          <McNavigationMenuItem>
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
            <McNavigationMenuTrigger>Status</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="w-[200px]">
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
        </McNavigationMenuList>
      </McNavigationMenu>
    </div>
  ),
};

export const BasicTrigger: Story = {
  render: (args) => (
    <div className="flex w-full justify-center py-10">
      <McNavigationMenu {...args}>
        <McNavigationMenuList>
          <McNavigationMenuItem>
            <McNavigationMenuTrigger>Docs</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="w-80">
                <ListItem href="/docs/introduction" title="Introduction">
                  Getting started with MicroClub UI
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  Step-by-step setup guide
                </ListItem>
              </ul>
            </McNavigationMenuContent>
          </McNavigationMenuItem>
        </McNavigationMenuList>
      </McNavigationMenu>
    </div>
  ),
};

export const GridLayout: Story = {
  render: (args) => (
    <div className="flex w-full justify-center py-10">
      <McNavigationMenu {...args}>
        <McNavigationMenuList>
          <McNavigationMenuItem>
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
        </McNavigationMenuList>
      </McNavigationMenu>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex w-full justify-center py-10">
      <McNavigationMenu {...args}>
        <McNavigationMenuList>
          <McNavigationMenuItem>
            <McNavigationMenuTrigger>Status</McNavigationMenuTrigger>
            <McNavigationMenuContent>
              <ul className="w-[200px]">
                <li className="flex flex-col gap-1">
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
        </McNavigationMenuList>
      </McNavigationMenu>
    </div>
  ),
};

const components = [
  {
    title: 'Alert Dialog',
    href: '#alert-dialog',
    description: 'A modal dialog that interrupts the user with important content.',
  },
  {
    title: 'Hover Card',
    href: '#hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '#progress',
    description: 'Displays an indicator showing the completion progress of a task.',
  },
  {
    title: 'Scroll-area',
    href: '#scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '#tabs',
    description: 'A set of layered sections of content known as tab panels.',
  },
  {
    title: 'Tooltip',
    href: '#tooltip',
    description: 'A popup that displays information on focus or hover.',
  },
];

function ListItem({
  title,
  children,
  href,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <McNavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-card-foreground">{title}</p>
              <p className="line-clamp-2 text-muted-foreground">{children}</p>
            </div>
          </Link>
        }
      />
    </li>
  );
}
