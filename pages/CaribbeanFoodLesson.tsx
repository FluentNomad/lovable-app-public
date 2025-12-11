import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, Lock, CheckCircle2, Sparkles, ShoppingBag } from "lucide-react";
import { HoverTranslation } from "@/components/lesson/HoverTranslation";
import { GrammarPopup } from "@/components/lesson/GrammarPopup";
import { AudioMatch } from "@/components/exercises/AudioMatch";
import { CulturalQuiz } from "@/components/exercises/CulturalQuiz";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const lessons = [
  { id: 1, title: "Basic Caribbean Greetings", level: "Beginner", locked: false, completed: true },
  { id: 2, title: "Ordering Rice & Beans", level: "Beginner", locked: false, completed: false },
  { id: 3, title: "Coconut Vocabulary", level: "Intermediate", locked: false, completed: false },
  { id: 4, title: "Caribbean Spices & Flavors", level: "Intermediate", locked: true, completed: false },
  { id: 5, title: "Cultural Stories & Recipes", level: "Advanced", locked: true, completed: false },
];

const relatedRegions = [
  { id: "central-valley", name: "Central Valley" },
  { id: "puntarenas", name: "Puntarenas" },
  { id: "talamanca", name: "Talamanca" },
];

export default function CaribbeanFoodLesson() {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
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
    toast.success(`+${points} points! 🥥`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-background to-teal-50 dark:from-background dark:via-muted/20 dark:to-background">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/food-accommodation")}
          className="mb-6"
        >
          ← Back to Food & Accommodation
        </Button>

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <Badge className="mb-2" variant="secondary">Caribbean Region - Limón</Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Caribbean Coastal Cuisine
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm">Listen to native Caribbean Spanish</span>
          </div>

          <p className="text-lg text-foreground/90 leading-relaxed">
            The Caribbean coast of Costa Rica brings together Afro-Caribbean traditions, 
            indigenous Bribri influences, and Spanish colonial heritage. The result? A cuisine 
            rich in coconut, spices, and soul — where every meal tells a story of migration, 
            resilience, and joy.
          </p>
        </div>

        {/* Cultural Story Section */}
        <Card className="max-w-4xl mx-auto mb-12 border-2 border-cyan-200/50 dark:border-cyan-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-600" />
              The Story of Rice & Beans
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              In the Caribbean, <HoverTranslation spanish="arroz con frijoles" english="rice and beans" /> 
              isn't just food — it's identity. Cooked together with <HoverTranslation spanish="leche de coco" english="coconut milk" />, 
              the dish absorbs the richness of the coast. The recipe was brought by Afro-Caribbean workers 
              who arrived in the late 19th century to build the railroad. Today, it's served at every celebration, 
              from <HoverTranslation spanish="fiestas" english="parties" /> to family gatherings.
            </p>
            <p className="leading-relaxed">
              The secret? Fresh coconut milk, <HoverTranslation spanish="culantro" english="long coriander" /> (not cilantro!), 
              and a touch of <HoverTranslation spanish="pimienta negra" english="black pepper" />. 
              Every family has their own variation, passed down through generations.
            </p>
            <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg mt-4">
              <p className="text-sm font-semibold mb-2">Key Ingredients:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Arroz (Rice)</Badge>
                <Badge variant="outline">Frijoles rojos (Red beans)</Badge>
                <Badge variant="outline">Leche de coco (Coconut milk)</Badge>
                <Badge variant="outline">Culantro</Badge>
                <Badge variant="outline">Pimienta negra (Black pepper)</Badge>
                <Badge variant="outline">Tomillo (Thyme)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Progression */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Progressive Lessons</h2>
          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`cursor-pointer transition-all duration-300 ${
                  lesson.locked
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-[1.02]"
                } ${selectedLesson === lesson.id ? "border-2 border-cyan-500" : ""}`}
                onClick={() => !lesson.locked && setSelectedLesson(lesson.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : lesson.locked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-primary" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <CardDescription>Level: {lesson.level}</CardDescription>
                      </div>
                    </div>
                    {lesson.locked && (
                      <Badge variant="secondary">Complete previous lessons</Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Grammar Focus */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>Grammar Focus: Polite Requests</CardTitle>
            <CardDescription>Learn to order food with respect and warmth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold mb-2">
                  <GrammarPopup
                    trigger="Quisiera"
                    title="Subjunctive: Polite Requests"
                    explanation="'Quisiera' is the imperfect subjunctive of 'querer' (to want). It's more polite than 'quiero' and is commonly used in restaurants and formal settings."
                    examples={[
                      "Quisiera probar el arroz con coco - I would like to try the rice with coconut",
                      "Quisiera que me traiga agua - I would like you to bring me water"
                    ]}
                    icon="📚"
                  /> probar el arroz con leche de coco
                </p>
                <p className="text-sm text-muted-foreground">I would like to try the rice with coconut milk</p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold mb-2">
                  ¿Me podría traer un poco de <HoverTranslation spanish="agua de sapo" english="ginger limeade" />?
                </p>
                <p className="text-sm text-muted-foreground">Could you bring me some ginger limeade?</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold mb-2">
                  ¿Este plato lleva <HoverTranslation spanish="picante" english="spicy" />?
                </p>
                <p className="text-sm text-muted-foreground">Does this dish have spice?</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Local Artisans */}
        <Card className="max-w-4xl mx-auto mb-12 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-600" />
              Support Caribbean Artisans
            </CardTitle>
            <CardDescription>
              Connect with local cooks and craft makers from the Limón region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Every purchase directly supports families keeping traditional Caribbean recipes 
              and crafts alive. From handmade coconut oil to woven baskets and recipe books, 
              your support makes a difference.
            </p>
            <Button className="w-full" variant="default">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Caribbean Crafts
            </Button>
          </CardContent>
        </Card>

        {/* Progress Tracker */}
        <Card className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Lesson Progress</span>
              <span className="text-sm font-bold">{progress.points} points</span>
            </div>
            <Progress value={(progress.points / 30) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* NEW: Audio Match Exercise */}
        <Card className="max-w-4xl mx-auto mb-8">
          <AudioMatch
            title="Match Caribbean Food Terms"
            pairs={[
              { spanish: "Arroz con frijoles", english: "Rice and beans" },
              { spanish: "Leche de coco", english: "Coconut milk" },
              { spanish: "Patí", english: "Spicy meat pastry" },
              { spanish: "Agua de sapo", english: "Ginger drink" },
              { spanish: "Pan bon", english: "Caribbean fruit bread" }
            ]}
            points={15}
            onComplete={() => handleExerciseComplete('audioMatch', 15)}
            completed={progress.audioMatch}
          />
        </Card>

        {/* NEW: Cultural Quiz */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CulturalQuiz
            title="Caribbean Cuisine Quiz"
            questions={[
              {
                question: "What makes Caribbean rice and beans different from traditional gallo pinto?",
                options: ["It uses white rice", "It's cooked with coconut milk", "It has no beans", "It's served cold"],
                correctAnswer: 1
              },
              {
                question: "What cultural group brought Caribbean cuisine to Costa Rica?",
                options: ["Spanish colonizers", "Afro-Caribbean railroad workers", "Chinese immigrants", "Italian settlers"],
                correctAnswer: 1
              },
              {
                question: "What is 'culantro' (used in Caribbean cooking)?",
                options: ["A type of fish", "Long coriander herb", "Coconut variety", "Spicy pepper"],
                correctAnswer: 1
              }
            ]}
            points={15}
            onComplete={() => handleExerciseComplete('quiz', 15)}
            completed={progress.quiz}
          />
        </Card>

        {/* Completion Message */}
        {progress.audioMatch && progress.quiz && (
          <Card className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/50">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-2">🥥 Caribbean Food Lesson Complete!</h3>
              <p className="text-muted-foreground mb-4">You earned {progress.points} points!</p>
              <Button onClick={() => navigate("/food-accommodation")}>
                Return to Food & Accommodation
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Compare with Other Regions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Compare with Other Regions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedRegions.map((region) => (
              <Card 
                key={region.id}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/food-accommodation/${region.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-base">{region.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Explore Cuisine
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
