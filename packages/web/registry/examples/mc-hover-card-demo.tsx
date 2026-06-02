import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/mc-hover-card';

const HoverCardDemo = () => {
  return (
    <div className="flex h-100 items-center justify-center">
      <HoverCard>
        <HoverCardTrigger>
          <button type="button" className="cursor-pointer rounded-full">
            hover me
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          textAlign="start"
          title="John Doe"
          subtitle="Software Engineer"
          description="John is a software engineer with 5 years of experience in web development. He loves working with React and TypeScript."
        ></HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default HoverCardDemo;
