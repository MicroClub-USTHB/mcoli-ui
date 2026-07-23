import {
  McCarousel,
  McCarouselContent,
  McCarouselItem,
  McCarouselNext,
  McCarouselPrevious,
} from '../ui/mc-carousel';

export default function McCarouselDemo() {
  return (
    <McCarousel className="w-full max-w-xs">
      <McCarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <McCarouselItem key={index}>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">{index + 1}</span>
            </div>
          </McCarouselItem>
        ))}
      </McCarouselContent>
      <McCarouselPrevious />
      <McCarouselNext />
    </McCarousel>
  );
}
