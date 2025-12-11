import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

interface JournalPromptProps {
  prompt: string;
  promptEnglish: string;
  points: number;
  onComplete: (points: number) => void;
  completed?: boolean;
  optional?: boolean;
}

export function JournalPrompt({ prompt, promptEnglish, points, onComplete, completed, optional }: JournalPromptProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim().length >= 20 && !completed) {
      onComplete(points);
    }
  };

  return (
    <Card className={completed ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>✍️ Journal Reflection {optional && <span className="text-xs text-muted-foreground">(Optional)</span>}</span>
          {completed && <CheckCircle2 className="h-5 w-5 text-green-600" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">{prompt}</p>
          <p className="text-sm text-muted-foreground italic">{promptEnglish}</p>
        </div>
        
        <Textarea
          placeholder="Write your response here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
          disabled={completed}
        />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {text.length} characters (minimum 20)
          </span>
          {!completed && (
            <Button onClick={handleSubmit} disabled={text.trim().length < 20}>
              Submit (+{points} points)
            </Button>
          )}
        </div>

        {completed && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" /> Reflection saved! +{points} points
          </div>
        )}
      </CardContent>
    </Card>
  );
}
