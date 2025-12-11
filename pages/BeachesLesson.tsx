import { ArrowLeft, Palmtree, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioSpanish } from "@/components/lesson/AudioSpanish";
import { AudioMatch } from "@/components/exercises/AudioMatch";
import { CulturalQuiz } from "@/components/exercises/CulturalQuiz";
import { useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const BeachesLesson = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    audioMatch: false,
    quiz: false,
    points: 0
  });

  const handleExerciseComplete = (exerciseType: string, points: number) => {
    setProgress(prev => ({
      ...prev,
      [exerciseType]: true,
      points: prev.points + points
    }));
    toast.success(`+${points} points! 🏖️`);
  };

  const topBeaches = [
    {
      name: "Santa Teresa",
      coast: "Pacific",
      vibe: "Bohemian surf paradise",
      activities: ["Surfing", "Yoga", "Sunset watching"],
    },
    {
      name: "Punta Uva",
      coast: "Caribbean",
      vibe: "Untouched jungle beach",
      activities: ["Swimming", "Snorkeling", "Kayaking"],
    },
    {
      name: "Manuel Antonio",
      coast: "Pacific",
      vibe: "Wildlife & white sand",
      activities: ["Hiking", "Wildlife spotting", "Swimming"],
    },
    {
      name: "Playa Conchal",
      coast: "Pacific",
      vibe: "Crushed shell paradise",
      activities: ["Snorkeling", "Paddleboarding", "Beachcombing"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate("/oceans")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Oceans
        </Button>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏖️</div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="block text-2xl text-muted-foreground mb-2">Playas</span>
            Costa Rica Beaches
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most beautiful beaches on both coasts
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress Tracker */}
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Lesson Progress</span>
                <span className="text-sm font-bold">{progress.points} points</span>
              </div>
              <Progress value={(progress.points / 30) * 100} className="h-2" />
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palmtree className="h-5 w-5" />
                Beach Vocabulary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <AudioSpanish spanish="La playa" english="The beach" />
              <AudioSpanish spanish="La arena" english="The sand" />
              <AudioSpanish spanish="Las olas" english="The waves" />
              <AudioSpanish spanish="La marea" english="The tide" />
              <AudioSpanish spanish="El salvavidas" english="The lifeguard" />
              <AudioSpanish spanish="Las palmeras" english="The palm trees" />
            </CardContent>
          </Card>

          {/* NEW: Audio Match Exercise */}
          <AudioMatch
            title="Match Beach Terms"
            pairs={[
              { spanish: "La playa", english: "The beach" },
              { spanish: "Las olas", english: "The waves" },
              { spanish: "La arena", english: "The sand" },
              { spanish: "El salvavidas", english: "The lifeguard" },
              { spanish: "Las palmeras", english: "The palm trees" }
            ]}
            points={15}
            onComplete={() => handleExerciseComplete('audioMatch', 15)}
            completed={progress.audioMatch}
          />

          {/* Top Beaches Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {topBeaches.map((beach) => (
              <Card key={beach.name} className="border-2 hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{beach.name}</span>
                    <span className="text-xs font-normal px-2 py-1 bg-primary/20 rounded-full">
                      {beach.coast}
                    </span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground italic">{beach.vibe}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {beach.activities.map((activity) => (
                      <span
                        key={activity}
                        className="text-xs px-2 py-1 bg-accent/20 rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Beach Activities */}
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardHeader>
              <CardTitle>🚣 Beach Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <AudioSpanish spanish="Quiero alquilar un kayak" english="I want to rent a kayak" />
              <AudioSpanish spanish="¿Dónde puedo hacer paddleboard?" english="Where can I paddleboard?" />
              <AudioSpanish spanish="¿Hay tours de snorkel?" english="Are there snorkel tours?" />
              <AudioSpanish spanish="¿Cuál playa es mejor para nadar?" english="Which beach is best for swimming?" />
            </CardContent>
          </Card>

          {/* Hidden Gems */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Hidden Gems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Beyond the famous beaches, Costa Rica has countless secluded spots. Ask locals about:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🌴</span>
                  <div>
                    <p className="font-medium">Playa Ventanas</p>
                    <p className="text-muted-foreground">Famous for sea caves and low tide pools</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🐚</span>
                  <div>
                    <p className="font-medium">Manzanillo</p>
                    <p className="text-muted-foreground">Remote Caribbean paradise with coral reefs</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🐋</span>
                  <div>
                    <p className="font-medium">Bahía Ballena</p>
                    <p className="text-muted-foreground">Shaped like a whale's tail — perfect for families</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NEW: Cultural Quiz */}
          <CulturalQuiz
            title="Beach Knowledge Quiz"
            questions={[
              {
                question: "Which coast is known for powerful surf breaks?",
                options: ["Caribbean", "Pacific", "Both equally", "Neither"],
                correctAnswer: 1
              },
              {
                question: "What does 'Pura Vida' mean at Costa Rican beaches?",
                options: ["Pure water", "Good vibes / Pure life", "Private beach", "No swimming"],
                correctAnswer: 1
              },
              {
                question: "Which beach is famous for nesting sea turtles?",
                options: ["Tamarindo", "Tortuguero", "Santa Teresa", "Jacó"],
                correctAnswer: 1
              }
            ]}
            points={15}
            onComplete={() => handleExerciseComplete('quiz', 15)}
            completed={progress.quiz}
          />

          {/* Completion Message */}
          {progress.audioMatch && progress.quiz && (
            <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/50">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-2">🏖️ Beach Lesson Complete!</h3>
                <p className="text-muted-foreground mb-4">You earned {progress.points} points!</p>
                <Button onClick={() => navigate("/oceans")}>
                  Return to Oceans
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeachesLesson;
