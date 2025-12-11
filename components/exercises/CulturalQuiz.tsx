import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, X } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CulturalQuizProps {
  title: string;
  questions: QuizQuestion[];
  points: number;
  onComplete: (points: number) => void;
  completed?: boolean;
  optional?: boolean;
}

export function CulturalQuiz({ title, questions, points, onComplete, completed, optional }: CulturalQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answerIdx: number) => {
    if (completed || selectedAnswer !== null) return;
    setSelectedAnswer(answerIdx);
    
    const isCorrect = answerIdx === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        if (!completed && correctAnswers + (isCorrect ? 1 : 0) >= Math.ceil(questions.length * 0.6)) {
          onComplete(points);
        }
      }
    }, 1200);
  };

  if (showResult && completed) {
    return (
      <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <span>🎯 {title}</span>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold text-green-600">{correctAnswers}/{questions.length} Correct</p>
            <p className="text-sm text-muted-foreground">Quiz completed! +{points} points</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>🎯 {title} {optional && <span className="text-xs text-muted-foreground">(Optional)</span>}</span>
          <span className="text-sm text-muted-foreground">Question {currentQuestion + 1}/{questions.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{questions[currentQuestion].question}</p>
        
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerClick(idx)}
              disabled={selectedAnswer !== null}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === null
                  ? "border-border hover:border-primary/50"
                  : selectedAnswer === idx
                  ? idx === questions[currentQuestion].correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : "border-destructive bg-destructive/10"
                  : idx === questions[currentQuestion].correctAnswer
                  ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                  : "border-border opacity-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="flex items-center gap-2 text-sm font-medium">
            {selectedAnswer === questions[currentQuestion].correctAnswer ? (
              <><CheckCircle2 className="h-4 w-4 text-green-600" /> Correct!</>
            ) : (
              <><X className="h-4 w-4 text-destructive" /> Incorrect</>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
