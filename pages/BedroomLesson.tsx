import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BedDouble, Lock, CheckCircle2, PlayCircle } from "lucide-react";
import { HoverTranslation } from "@/components/lesson/HoverTranslation";
import { GrammarPopup } from "@/components/lesson/GrammarPopup";
import { AudioSpanish } from "@/components/lesson/AudioSpanish";

interface Lesson {
  id: string;
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  points: number;
}

export default function BedroomLesson() {
  const navigate = useNavigate();
  const [lessons] = useState<Lesson[]>([
    {
      id: "1",
      title: "Bedroom Vocabulary",
      description: "Learn essential bedroom items and furniture",
      isLocked: false,
      isCompleted: true,
      points: 10
    },
    {
      id: "2",
      title: "Reflexive Verbs: Morning Routine",
      description: "Master despertarse, levantarse, vestirse",
      isLocked: false,
      isCompleted: true,
      points: 15
    },
    {
      id: "3",
      title: "Asking for Comfort",
      description: "Request extra blankets, pillows, or adjust the fan",
      isLocked: false,
      isCompleted: false,
      points: 10
    },
    {
      id: "4",
      title: "Evening Routine",
      description: "Practice acostarse, dormirse, and goodnight phrases",
      isLocked: true,
      isCompleted: false,
      points: 15
    }
  ]);

  const completedLessons = lessons.filter(l => l.isCompleted).length;
  const totalPoints = lessons.filter(l => l.isCompleted).reduce((sum, l) => sum + l.points, 0);
  const progress = (completedLessons / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/daily-life")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <BedDouble className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">The Bedroom (El Dormitorio)</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Daily routines, clothing, and personal space vocabulary
            </p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Your Progress</CardTitle>
              <Badge variant="secondary">{totalPoints} points</Badge>
            </div>
            <CardDescription>
              {completedLessons} of {lessons.length} lessons completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Cultural Story */}
        <Card className="bg-card/80 backdrop-blur border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-2xl">🏡 The Heart of Costa Rican Hospitality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground">
            <p>
              When you stay with a Costa Rican family, your <HoverTranslation spanish="dormitorio" english="bedroom" /> becomes 
              more than just a place to sleep—it's your home base, your sanctuary, and a symbol of the family's trust. 
            </p>
            <p>
              Costa Rican hosts take pride in making guests feel comfortable. Don't hesitate to ask for an 
              extra <HoverTranslation spanish="cobija" english="blanket" /> if the mountain nights get cold, or to adjust 
              the <HoverTranslation spanish="ventilador" english="fan" /> if it's too warm. These small requests show 
              you're settling in, not being demanding.
            </p>
            <AudioSpanish
              spanish="Buenos días, ¿dormiste bien?"
              english="Good morning, did you sleep well?"
            />
          </CardContent>
        </Card>

        {/* Lessons */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Bedroom Lessons</h2>
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className={`transition-all ${
                lesson.isLocked
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:scale-[1.02] hover:shadow-lg"
              }`}
              onClick={() => !lesson.isLocked && console.log("Open lesson:", lesson.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {lesson.isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : lesson.isLocked ? (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <PlayCircle className="h-6 w-6 text-primary" />
                    )}
                    <div>
                      <CardTitle className="text-xl">{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={lesson.isCompleted ? "default" : "outline"}>
                    {lesson.points} pts
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Grammar Focus */}
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">📚 Grammar Focus: Reflexive Verbs</CardTitle>
            <CardDescription>
              Actions you do to yourself (wake yourself up, dress yourself, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GrammarPopup
                  trigger={<span>despertarse</span>}
                  title="Despertarse (to wake up)"
                  explanation="This reflexive verb means 'to wake oneself up.' The 'se' at the end indicates the action is done to oneself."
                  examples={[
                    "Me despierto a las 6 - I wake up at 6",
                    "¿Te despiertas temprano? - Do you wake up early?",
                    "Ella se despierta tarde - She wakes up late"
                  ]}
                  icon="⏰"
                />
                <span className="text-muted-foreground">→ to wake (oneself) up</span>
              </div>
              
              <div className="flex items-center gap-2">
                <GrammarPopup
                  trigger={<span>levantarse</span>}
                  title="Levantarse (to get up)"
                  explanation="Literally 'to lift oneself up' - the action of getting out of bed."
                  examples={[
                    "Me levanto después de despertarme - I get up after waking up",
                    "¿Ya te levantaste? - Did you already get up?",
                    "Nos levantamos temprano - We get up early"
                  ]}
                  icon="🛏️"
                />
                <span className="text-muted-foreground">→ to get (oneself) up</span>
              </div>

              <div className="flex items-center gap-2">
                <GrammarPopup
                  trigger={<span>vestirse</span>}
                  title="Vestirse (to get dressed)"
                  explanation="To dress oneself. Notice the verb stem changes: me visto, te vistes, se viste."
                  examples={[
                    "Me visto rápido - I get dressed quickly",
                    "¿Qué te pones hoy? - What are you wearing today?",
                    "Se viste elegante - He/she dresses elegantly"
                  ]}
                  icon="👕"
                />
                <span className="text-muted-foreground">→ to dress (oneself)</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
              <h4 className="font-semibold mb-2">Example Conversation:</h4>
              <div className="space-y-2 text-sm">
                <p className="font-medium">Host: <HoverTranslation spanish="¿A qué hora te despiertas?" english="What time do you wake up?" /></p>
                <p className="font-medium">You: <HoverTranslation spanish="Me despierto a las siete." english="I wake up at seven." /></p>
                <p className="font-medium">Host: <HoverTranslation spanish="¿Necesitas algo para el dormitorio?" english="Do you need anything for the bedroom?" /></p>
                <p className="font-medium">You: <HoverTranslation spanish="¿Puedo tener otra cobija?" english="Can I have another blanket?" /></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vocabulary Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🔤 Essential Bedroom Vocabulary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { spanish: "la cama", english: "the bed" },
                { spanish: "la almohada", english: "the pillow" },
                { spanish: "la cobija / la manta", english: "the blanket" },
                { spanish: "el armario", english: "the closet/wardrobe" },
                { spanish: "el despertador", english: "the alarm clock" },
                { spanish: "el ventilador", english: "the fan" },
                { spanish: "la lámpara", english: "the lamp" },
                { spanish: "la ropa", english: "the clothes" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                  <span className="font-medium">{item.spanish}</span>
                  <span className="text-muted-foreground text-sm">{item.english}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
