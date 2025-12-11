import { useState } from "react";
import { cn } from "@/lib/utils";

interface HoverTranslationProps {
  spanish: string;
  english: string;
  className?: string;
}

export const HoverTranslation = ({ spanish, english, className }: HoverTranslationProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn(
        "relative inline-block cursor-help transition-all duration-300",
        "border-b-2 border-primary/30 hover:border-primary",
        "after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px]",
        "after:bg-primary/50 after:blur-sm after:opacity-0 hover:after:opacity-100",
        "after:transition-opacity after:duration-300",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {spanish}
      {isHovered && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-10 px-3 py-1.5 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg border border-border whitespace-nowrap animate-fade-in z-50">
          {english}
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></span>
        </span>
      )}
    </span>
  );
};
