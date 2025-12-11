import { ArrowLeft, Volume2, Flame, Droplets, TreePine, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverTranslation } from "@/components/lesson/HoverTranslation";
import arenalSiteMap from "@/assets/arenal-site-map.jpg";
import { useVolcanoProgress } from "@/hooks/use-progress";
import { useToast } from "@/components/ui/use-toast";

const ArenalVolcanoSite = () => {
  const navigate = useNavigate();
  const { markCompleted, progress } = useVolcanoProgress();
  const { toast } = useToast();

  const tours = [
    { name: "Hanging Bridges Tour", price: "Free guided walk", icon: "🌉" },
    { name: "Hot Springs Experience", price: "Natural pools", icon: "♨️" },
    { name: "La Fortuna Waterfall", price: "Free entrance", icon: "💦" },
    { name: "Night Lava Viewing", price: "Best at dusk", icon: "🔥" },
  ];

  const playAudio = (text: string) => {
    console.log("Playing audio:", text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate("/volcanoes")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Volcanoes
        </Button>

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🌋</div>
          <h1 className="text-4xl font-bold mb-4">Volcán Arenal</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Costa Rica's most iconic volcano - dormant since 2010 but still spectacular
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left: Site Map */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  Área del Volcán Arenal
                </CardTitle>
                <CardDescription>
                  Interactive map showing attractions, trails, and natural wonders
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <img src={arenalSiteMap} alt="Arenal Volcano Area Map" className="w-full h-auto" />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>🏔️</span>
                    <span>Perfect cone shape - 1,657m elevation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>💧</span>
                    <span>Lake Arenal - windsurfing paradise</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>🌳</span>
                    <span>Rainforest trails with wildlife</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Available Tours & Activities
                </CardTitle>
                <CardDescription>Free and subscriber-exclusive experiences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tours.map((tour, idx) => (
                  <div key={idx} className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tour.icon}</span>
                        <div>
                          <p className="font-medium">{tour.name}</p>
                          <p className="text-sm text-muted-foreground">{tour.price}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t">
                  <p className="text-xs text-center text-muted-foreground">
                    🎟️ Business subscribers can access exclusive guided tours with local experts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Lesson Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Arenal: De Fuego a Paz
                  <Button size="icon" variant="ghost" onClick={() => playAudio("El Arenal fue el volcán más activo")}>
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base leading-relaxed">
                <p>
                  <HoverTranslation spanish="El Arenal" english="The Arenal" /> fue el volcán más activo de Costa Rica 
                  desde 1968 hasta 2010. Sus <HoverTranslation spanish="erupciones" english="eruptions" /> iluminaban 
                  el cielo nocturno.
                </p>
                <p>
                  Hoy en día, <HoverTranslation spanish="el volcán está dormido" english="the volcano is dormant" />, 
                  pero las <HoverTranslation spanish="aguas termales" english="hot springs" /> siguen activas gracias al 
                  calor subterráneo.
                </p>
                <p>
                  <HoverTranslation spanish="La Fortuna" english="La Fortuna" />, el pueblo cercano, 
                  ofrece vistas perfectas del cono volcánico y acceso a <HoverTranslation spanish="senderos naturales" english="nature trails" />.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🗣️ Conversación: Reservando un Tour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🧍‍♂️</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-muted-foreground">Tourist:</p>
                      <p className="text-base">¿Cuánto cuesta el tour de las aguas termales?</p>
                      <p className="text-xs text-muted-foreground italic">How much does the hot springs tour cost?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🧍‍♀️</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-muted-foreground">Guide:</p>
                      <p className="text-base">Tenemos opciones desde $40 hasta $120.</p>
                      <p className="text-xs text-muted-foreground italic">We have options from $40 to $120.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🧍‍♂️</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-muted-foreground">Tourist:</p>
                      <p className="text-base">¿Qué incluye el tour de $40?</p>
                      <p className="text-xs text-muted-foreground italic">What does the $40 tour include?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🧍‍♀️</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-muted-foreground">Guide:</p>
                      <p className="text-base">Incluye transporte, entrada, y dos horas en las termas.</p>
                      <p className="text-xs text-muted-foreground italic">It includes transport, entrance, and two hours in the hot springs.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grammar: Numbers & Prices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-300">40 = cuarenta</p>
                    <p className="text-xs text-muted-foreground">forty</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-300">120 = ciento veinte</p>
                    <p className="text-xs text-muted-foreground">one hundred twenty</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium">Useful phrases:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• ¿Cuánto cuesta? = How much does it cost?</li>
                    <li>• Desde... hasta... = From... to...</li>
                    <li>• ¿Qué incluye? = What does it include?</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle>📚 Ready to Practice?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => navigate('/volcano/arenal/exercises')}>
                  🎓 Start Interactive Exercises
                </Button>
                <div className="text-xs text-center text-muted-foreground">
                  {progress.arenal.points > 0 ? `${progress.arenal.points} points earned` : 'Complete exercises to earn points'}
                </div>
                <Button className="w-full" variant="outline">
                  🎧 Listen to Full Audio
                </Button>
                <Button className="w-full" variant="outline" onClick={() => navigate('/volcanoes')}>
                  🗺️ Explore Another Volcano
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenalVolcanoSite;
