import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Volume2, X } from "lucide-react";

interface AudioPair {
  spanish: string;
  english: string;
}

interface AudioMatchProps {
  title: string;
  pairs: AudioPair[];
  points: number;
  onComplete: (points: number) => void;
  completed?: boolean;
}

export function AudioMatch({ title, pairs, points, onComplete, completed }: AudioMatchProps) {
  const [selectedSpanish, setSelectedSpanish] = useState<number | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<boolean>(false);

  const handleSpanishClick = (idx: number) => {
    if (completed || matched.includes(idx)) return;
    setSelectedSpanish(idx);
    setWrongPair(false);
    if (selectedEnglish !== null) {
      checkMatch(idx, selectedEnglish);
    }
  };

  const handleEnglishClick = (idx: number) => {
    if (completed || matched.includes(idx)) return;
    setSelectedEnglish(idx);
    setWrongPair(false);
    if (selectedSpanish !== null) {
      checkMatch(selectedSpanish, idx);
    }
  };

  const checkMatch = (spanishIdx: number, englishIdx: number) => {
    if (spanishIdx === englishIdx) {
      setMatched([...matched, spanishIdx]);
      setSelectedSpanish(null);
      setSelectedEnglish(null);
      if (matched.length + 1 === pairs.length && !completed) {
        setTimeout(() => onComplete(points), 500);
      }
    } else {
      setWrongPair(true);
      setTimeout(() => {
        setSelectedSpanish(null);
        setSelectedEnglish(null);
        setWrongPair(false);
      }, 1000);
    }
  };

  return (
    <Card className={completed ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>🎧 {title}</span>
          {completed && <CheckCircle2 className="h-5 w-5 text-green-600" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Match the Spanish words with their English meanings</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {pairs.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => handleSpanishClick(idx)}
                disabled={completed || matched.includes(idx)}
                className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  matched.includes(idx)
                    ? "bg-green-50 dark:bg-green-950/20 border-green-500 opacity-50"
                    : selectedSpanish === idx
                    ? wrongPair
                      ? "border-destructive bg-destructive/10"
                      : "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Volume2 className="h-4 w-4" />
                <span className="font-medium">{pair.spanish}</span>
              </button>
            ))}
          </div>
          
          <div className="space-y-2">
            {pairs.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => handleEnglishClick(idx)}
                disabled={completed || matched.includes(idx)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  matched.includes(idx)
                    ? "bg-green-50 dark:bg-green-950/20 border-green-500 opacity-50"
                    : selectedEnglish === idx
                    ? wrongPair
                      ? "border-destructive bg-destructive/10"
                      : "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="text-sm">{pair.english}</span>
              </button>
            ))}
          </div>
        </div>

        {completed && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" /> Complete! +{points} points
          </div>
        )}
      </CardContent>
    </Card>
  );
}
