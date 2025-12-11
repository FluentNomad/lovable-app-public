import { ArrowLeft, Volume2, Mountain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverTranslation } from "@/components/lesson/HoverTranslation";
import { GrammarPopup } from "@/components/lesson/GrammarPopup";
const ArenalLesson = () => {
  const navigate = useNavigate();
  const playAudio = (text: string) => {
    // Placeholder for audio playback
    console.log("Playing audio:", text);
  };
  return <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate("/costa-rica")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Costa Rica
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌋</div>
          <h1 className="text-4xl font-bold mb-4">Volcánes de Costa Rica</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn Spanish while exploring one of Costa Rica's most iconic volcanoes
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Visual */}
          <Card className="overflow-hidden">
            <div className="h-64 bg-cover bg-center" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800')"
          }} />
            <CardHeader>
              <CardTitle>About Arenal</CardTitle>
              <CardDescription>
                Arenal was Costa Rica's most active volcano until 2010. Today, it offers stunning trails, 
                hot springs, and diverse wildlife.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Right Column - Interactive Content */}
          <div className="space-y-6">
            {/* Interactive Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Read & Learn
                  <Button size="icon" variant="ghost" onClick={() => playAudio("Costa Rica tiene muchos volcanes activos")}>
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-base leading-relaxed">
                <p>
                  Costa Rica tiene muchos <HoverTranslation spanish="volcanes" english="volcanoes" /> activos.{" "}
                  <HoverTranslation spanish="El volcán" english="The volcano" /> Arenal es uno de los más famosos.{" "}
                  <HoverTranslation spanish="La lava" english="The lava" /> fluye lentamente por sus{" "}
                  <HoverTranslation spanish="laderas" english="slopes" />.
                </p>
                <p>
                  <HoverTranslation spanish="Los turistas" english="The tourists" /> visitan el parque nacional para ver{" "}
                  <HoverTranslation spanish="el cráter" english="the crater" />.{" "}
                  <HoverTranslation spanish="Las plantas" english="The plants" /> alrededor del volcán son muy verdes.
                </p>
              </CardContent>
            </Card>

            {/* Phrase Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Build Your Phrase</CardTitle>
                <CardDescription>Drag the tiles to create: "El volcán está activo"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['El', 'volcán', 'está', 'activo'].map((word, idx) => <button key={idx} onClick={() => playAudio(word)} className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg font-medium transition-all hover:scale-105">
                      {word}
                    </button>)}
                </div>
              </CardContent>
            </Card>

            {/* Mini Dialogue */}
            <Card>
              <CardHeader>
                <CardTitle>Mini Dialogue</CardTitle>
                <CardDescription>Listen to a conversation between a tourist and a guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🧍‍♂️</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-muted-foreground">Tourist:</p>
                    <p className="text-base">¿Dónde está el volcán?</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🧍‍♀️</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-muted-foreground">Guide:</p>
                    <p className="text-base">Está en el norte de Costa Rica.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🧍‍♂️</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-muted-foreground">Tourist:</p>
                    <p className="text-base">¿Es peligroso?</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl">🧍‍♀️</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-muted-foreground">Guide:</p>
                    <p className="text-base">No, está dormido hoy.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grammar Points */}
            <Card>
              <CardHeader>
                <CardTitle>Grammar Mini-Class</CardTitle>
                <CardDescription>El, La, Los, Las — Definite Articles in Spanish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="font-semibold text-sm text-blue-900 dark:text-blue-300">Masculine singular</p>
                    <p className="text-lg mt-1">el volcán</p>
                  </div>
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <p className="font-semibold text-sm text-pink-900 dark:text-pink-300">Feminine singular</p>
                    <p className="text-lg mt-1">la lava</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="font-semibold text-sm text-blue-900 dark:text-blue-300">Masculine plural</p>
                    <p className="text-lg mt-1">los turistas</p>
                  </div>
                  <div className="p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <p className="font-semibold text-sm text-pink-900 dark:text-pink-300">Feminine plural</p>
                    <p className="text-lg mt-1">las plantas</p>
                  </div>
                </div>
                <div className="pt-2 space-y-2 border-t">
                  <p className="text-sm font-medium">Examples:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• El volcán está activo.</li>
                    <li>• La lava es caliente.</li>
                    <li>• Los turistas caminan por el sendero.</li>
                    <li>• Las plantas crecen cerca del cráter.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quiz */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 font-medium">¿Cuál es el artículo correcto para "lava"?</p>
                <div className="space-y-2">
                  {['El', 'La', 'Los', 'Las'].map((option, idx) => <button key={idx} onClick={() => {
                  if (option === 'La') {
                    alert('🌋 ¡Correcto! "Lava" is feminine singular → "la lava"');
                  } else {
                    alert('Try again! Remember: "lava" is feminine singular.');
                  }
                }} className="w-full p-3 text-left border rounded-lg hover:bg-secondary/50 transition-colors">
                      {option}
                    </button>)}
                </div>
              </CardContent>
            </Card>

            {/* Adventure Options */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle>🗺️ Explore Arenal Region</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg" variant="default">
                  🧑‍🏫 Book a Guide
                </Button>
                <Button className="w-full" variant="outline">
                  🥾 Free Hike Info
                </Button>
                <Button className="w-full" variant="outline">
                  🧠 Indigenous Wisdom
                </Button>
                <Button className="w-full" variant="outline">
                  📚 Grammar Boost
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Connect with local guides, free activities, and cultural insights
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default ArenalLesson;