import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, X } from "lucide-react";

interface PhraseBuilderProps {
  spanish: string;
  english: string;
  words: string[];
  points: number;
  onComplete: (points: number) => void;
  completed?: boolean;
}

export function PhraseBuilder({ spanish, english, words, points, onComplete, completed }: PhraseBuilderProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>(words);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (completed) return;
    
    if (fromSelected) {
      setSelected(selected.filter(w => w !== word));
      setAvailable([...available, word]);
    } else {
      setSelected([...selected, word]);
      setAvailable(available.filter(w => w !== word));
    }
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const userAnswer = selected.join(" ");
    const correct = userAnswer === spanish;
    setIsCorrect(correct);
    if (correct && !completed) {
      setTimeout(() => onComplete(points), 800);
    }
  };

  return (
    <Card className={completed ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>🔤 Phrase Builder</span>
          {completed && <CheckCircle2 className="h-5 w-5 text-green-600" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground italic">{english}</div>
        
        <div className="min-h-[60px] p-4 border-2 border-dashed rounded-lg bg-secondary/20">
          {selected.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm">Tap words below to build the phrase</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selected.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWordClick(word, true)}
                  className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  disabled={completed}
                >
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {available.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordClick(word, false)}
              className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-md transition-colors"
              disabled={completed}
            >
              {word}
            </button>
          ))}
        </div>

        {!completed && (
          <Button onClick={checkAnswer} className="w-full" disabled={selected.length === 0}>
            Check Answer
          </Button>
        )}

        {isCorrect === true && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" /> Correct! +{points} points
          </div>
        )}
        {isCorrect === false && (
          <div className="flex items-center gap-2 text-destructive text-sm font-medium">
            <X className="h-4 w-4" /> Not quite. Try again!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
