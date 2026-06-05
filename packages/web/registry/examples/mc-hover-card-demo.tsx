import { McHoverCard, McHoverCardContent, McHoverCardTrigger } from '../ui/mc-hover-card';

export default function McHoverCardDemo() {
  return (
    <div className="flex h-100 items-center justify-center">
      <McHoverCard>
        <McHoverCardTrigger>
          <button type="button" className="cursor-pointer rounded-full">
            hover me
          </button>
        </McHoverCardTrigger>
        <McHoverCardContent
          textAlign="start"
          title="John Doe"
          subtitle="Software Engineer"
          description="John is a software engineer with 5 years of experience in web development. He loves working with React and TypeScript."
        />
      </McHoverCard>
    </div>
  );
}
