import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AudioSpanishProps {
  spanish: string;
  english: string;
  className?: string;
  showEnglish?: boolean;
}

export const AudioSpanish = ({ spanish, english, className, showEnglish = true }: AudioSpanishProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    setIsPlaying(true);
    // Placeholder for future AI TTS integration
    console.log("Playing audio:", spanish);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <Button
        size="icon"
        variant="ghost"
        onClick={playAudio}
        disabled={isPlaying}
        className="h-8 w-8 shrink-0"
      >
        <Volume2 className={cn("h-4 w-4", isPlaying && "animate-pulse")} />
      </Button>
      <div className="flex-1">
        <p className="font-medium">{spanish}</p>
        {showEnglish && (
          <p className="text-sm text-muted-foreground">{english}</p>
        )}
      </div>
    </div>
  );
};
