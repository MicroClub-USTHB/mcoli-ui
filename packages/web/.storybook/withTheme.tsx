import { useEffect } from 'react';
import type { Decorator } from '@storybook/nextjs-vite';
import { ColorThemeProvider } from '../components/ColorThemeProvider';

export const withTheme: Decorator = (Story, context) => {
  const { theme, mode } = context.globals;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme || 'primary');
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mode]);

  return (
    <ColorThemeProvider>
      <div className="bg-background text-foreground antialiased max-w-100">
        <Story />
      </div>
    </ColorThemeProvider>
  );
};
