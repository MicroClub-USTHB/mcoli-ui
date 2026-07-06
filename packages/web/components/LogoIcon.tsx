import { cn } from '@/lib/utils';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className, size = 32 }: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      className={cn('shrink-0 transition-colors duration-300', className)}
    >
      <path
        d="M 16 79 V 31 A 22 22 0 0 1 60 31 A 22 22 0 0 1 104 31 V 79 M 60 31 V 79"
        stroke="var(--foreground)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 38 30 V 80 A 22 22 0 0 0 82 80 V 30"
        stroke="var(--primary)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
