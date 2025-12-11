import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhraseBuilder } from "@/components/exercises/PhraseBuilder";
import { AudioMatch } from "@/components/exercises/AudioMatch";
import { MapChallenge } from "@/components/exercises/MapChallenge";
import { CulturalQuiz } from "@/components/exercises/CulturalQuiz";
import { JournalPrompt } from "@/components/exercises/JournalPrompt";
import { useVolcanoProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const ArenalLessonInteractive = () => {
  const navigate = useNavigate();
  const { progress, completeExercise, totalPoints } = useVolcanoProgress();
  const { toast } = useToast();
  const arenalProgress = progress.arenal || { 
    completed: false, 
    points: 0, 
    exercises: { phrase: false, audio: false, map: false, quiz: false, journal: false } 
  };

  const handleExerciseComplete = (exerciseId: "phrase" | "audio" | "map" | "quiz" | "journal", points: number) => {
    if (!arenalProgress.exercises[exerciseId]) {
      completeExercise("arenal", exerciseId, points);
      toast({ title: `+${points} points!`, description: "Progress saved automatically" });
    }
  };

  const requiredComplete = arenalProgress.exercises.phrase && arenalProgress.exercises.audio && arenalProgress.exercises.map;
  const allComplete = requiredComplete && arenalProgress.exercises.quiz && arenalProgress.exercises.journal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate("/volcano/arenal")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Arenal Overview
        </Button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌋</div>
          <h1 className="text-4xl font-bold mb-4">Arenal Interactive Exercises</h1>
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span>Your Progress</span>
              <span>{arenalProgress.points} points</span>
            </div>
            <Progress value={(arenalProgress.points / 55) * 100} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>✅ Required Exercises</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Complete these three exercises to unlock the next volcano
            </CardContent>
          </Card>

          <PhraseBuilder
            spanish="¿Dónde puedo ver el volcán?"
            english="Where can I see the volcano?"
            words={["¿Dónde", "puedo", "ver", "el", "volcán?"]}
            points={10}
            onComplete={(pts) => handleExerciseComplete("phrase", pts)}
            completed={arenalProgress.exercises.phrase}
          />

          <AudioMatch
            title="Local Voices: Arenal"
            pairs={[
              { spanish: "aguas termales", english: "hot springs" },
              { spanish: "actividad volcánica", english: "volcanic activity" },
              { spanish: "mirador", english: "viewpoint" },
            ]}
            points={8}
            onComplete={(pts) => handleExerciseComplete("audio", pts)}
            completed={arenalProgress.exercises.audio}
          />

          <MapChallenge
            volcanoName="Arenal"
            correctRegion="Northern Lowlands"
            regions={[
              { name: "Northern Lowlands", position: { top: "30%", left: "25%" } },
              { name: "Central Valley", position: { top: "50%", left: "50%" } },
              { name: "Guanacaste", position: { top: "20%", left: "15%" } },
              { name: "Caribbean Coast", position: { top: "40%", left: "75%" } },
            ]}
            points={10}
            onComplete={(pts) => handleExerciseComplete("map", pts)}
            completed={arenalProgress.exercises.map}
          />

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle>⭐ Optional Exercises</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Boost your score and deepen your cultural understanding
            </CardContent>
          </Card>

          <CulturalQuiz
            title="Arenal y el turismo"
            questions={[
              {
                question: "When did Arenal last erupt?",
                options: ["1968", "2010", "1994", "2020"],
                correctAnswer: 1,
              },
              {
                question: "What is the nearest town to Arenal?",
                options: ["San José", "La Fortuna", "Liberia", "Limón"],
                correctAnswer: 1,
              },
              {
                question: "What natural feature is Arenal famous for besides the volcano?",
                options: ["Beaches", "Hot springs", "Rainforests only", "Deserts"],
                correctAnswer: 1,
              },
            ]}
            points={12}
            onComplete={(pts) => handleExerciseComplete("quiz", pts)}
            completed={arenalProgress.exercises.quiz}
            optional
          />

          <JournalPrompt
            prompt="¿Qué harías en un día en Arenal?"
            promptEnglish="What would you do on a day in Arenal?"
            points={5}
            onComplete={(pts) => handleExerciseComplete("journal", pts)}
            completed={arenalProgress.exercises.journal}
            optional
          />

          {requiredComplete && (
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                {allComplete ? (
                  <>
                    <div className="text-4xl">🎉</div>
                    <h3 className="text-2xl font-bold">Arenal Master!</h3>
                    <p className="text-muted-foreground">You've completed all exercises for this volcano</p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => navigate("/volcanoes")}>
                        View All Volcanoes
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/volcano/final-challenge")}>
                        Try Final Challenge
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl">✅</div>
                    <h3 className="text-xl font-bold">Required Exercises Complete!</h3>
                    <p className="text-muted-foreground">Next volcano unlocked. Complete optional exercises for more points!</p>
                    <Button onClick={() => navigate("/volcanoes")}>
                      Continue to Next Volcano
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArenalLessonInteractive;
