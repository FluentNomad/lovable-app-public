import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GrammarPopupProps {
  trigger: ReactNode;
  title: string;
  explanation: string;
  examples?: string[];
  icon?: ReactNode;
  className?: string;
}

export const GrammarPopup = ({
  trigger,
  title,
  explanation,
  examples,
  icon,
  className,
}: GrammarPopupProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-md",
            "bg-primary/10 hover:bg-primary/20 text-primary font-medium",
            "transition-all duration-200 hover:scale-105",
            "border border-primary/20 hover:border-primary/40",
            className
          )}
        >
          {trigger}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            {title}
          </DialogTitle>
          <DialogDescription className="text-left pt-4 space-y-4">
            <p className="text-foreground">{explanation}</p>
            {examples && examples.length > 0 && (
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Examples:</p>
                <ul className="list-disc list-inside space-y-1">
                  {examples.map((example, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
