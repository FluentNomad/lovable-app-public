import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Volume2, Trees, AlertTriangle } from "lucide-react";
import { HoverTranslation } from "@/components/lesson/HoverTranslation";
import { GrammarPopup } from "@/components/lesson/GrammarPopup";
import caboBlancoSiteMap from "@/assets/cabo-blanco-site-map.jpg";

const CaboBlancoSite = () => {
  const navigate = useNavigate();

  const playAudio = (text: string) => {
    console.log("Playing audio for:", text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/national-parks")}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to National Parks
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trees className="h-10 w-10 text-amber-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Cabo Blanco Absolute Natural Reserve</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Costa Rica's first protected wilderness area — where conservation history began in 1963.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8">
          {/* Left Column - Map */}
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/5 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Reserve Map</h2>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <img 
                src={caboBlancoSiteMap} 
                alt="Cabo Blanco Reserve Map" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Explore trails through tropical dry forest to pristine beaches at the tip of Nicoya Peninsula
            </p>
          </Card>

          {/* Right Column - Content */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-background to-secondary/5 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Historical Significance</h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  <HoverTranslation spanish="Cabo Blanco" english="Cabo Blanco" /> was established in{" "}
                  <HoverTranslation spanish="1963" english="1963" /> thanks to the efforts of{" "}
                  <HoverTranslation spanish="Olof Wessberg y Karen Mogensen" english="Olof Wessberg and Karen Mogensen" />,
                  Swedish immigrants who recognized the need to protect this unique{" "}
                  <HoverTranslation spanish="bosque seco tropical" english="tropical dry forest" />.
                </p>
                <p>
                  As Costa Rica's <HoverTranslation spanish="primera reserva natural absoluta" english="first absolute natural reserve" />,
                  it represents the beginning of the country's renowned{" "}
                  <HoverTranslation spanish="sistema de áreas protegidas" english="protected areas system" />.
                  The reserve protects{" "}
                  <HoverTranslation spanish="1,172 hectáreas terrestres" english="1,172 terrestrial hectares" /> and{" "}
                  <HoverTranslation spanish="1,790 hectáreas marinas" english="1,790 marine hectares" />.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 shadow-lg border-amber-200 dark:border-amber-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trees className="h-5 w-5 text-amber-600" />
                Wildlife You'll See
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-background/80 rounded-lg">
                  <p className="font-semibold">
                    <HoverTranslation spanish="Mono carablanca" english="White-faced capuchin monkey" />
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Playful primates often seen along trails and beaches
                  </p>
                </div>
                <div className="p-3 bg-background/80 rounded-lg">
                  <p className="font-semibold">
                    <HoverTranslation spanish="Mono aullador" english="Howler monkey" />
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Listen for their distinctive calls echoing through the forest
                  </p>
                </div>
                <div className="p-3 bg-background/80 rounded-lg">
                  <p className="font-semibold">
                    <HoverTranslation spanish="Guatusa" english="Agouti" />
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Small rodents that play a crucial role in seed dispersal
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 shadow-lg border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Important Visitor Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-background/80 rounded-lg">
                  <button
                    onClick={() => playAudio("El sendero a la playa es de 4.5 kilómetros")}
                    className="mt-1 text-red-600 hover:text-red-700"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="font-semibold">El sendero a la playa es de 4.5 kilómetros</p>
                    <p className="text-sm text-muted-foreground">The trail to the beach is 4.5 kilometers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-background/80 rounded-lg">
                  <button
                    onClick={() => playAudio("Lleve suficiente agua")}
                    className="mt-1 text-red-600 hover:text-red-700"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="font-semibold">Lleve suficiente agua</p>
                    <p className="text-sm text-muted-foreground">Bring sufficient water</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-background/80 rounded-lg">
                  <button
                    onClick={() => playAudio("La reserva cierra los lunes y martes")}
                    className="mt-1 text-red-600 hover:text-red-700"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <div>
                    <p className="font-semibold">La reserva cierra los lunes y martes</p>
                    <p className="text-sm text-muted-foreground">The reserve is closed Mondays and Tuesdays</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 shadow-lg border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold mb-4">Grammar Focus: Past Tense for History</h3>
              <p className="text-sm mb-4">
                When discussing conservation history, you'll use the{" "}
                <GrammarPopup
                  trigger={<span>preterite tense</span>}
                  title="Preterite Tense"
                  explanation="The preterite is used for completed actions in the past, especially with specific dates or moments in history."
                  examples={[
                    "Se estableció en 1963 → It was established in 1963",
                    "Olof y Karen compraron la tierra → Olof and Karen bought the land",
                    "La reserva protegió el bosque → The reserve protected the forest"
                  ]}
                  icon="📜"
                />
                {" "}to describe specific historical events.
              </p>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-background/60 rounded-lg">
                  <p className="font-semibold text-blue-700 dark:text-blue-400">Cabo Blanco se estableció en 1963</p>
                  <p className="text-muted-foreground">Cabo Blanco was established in 1963</p>
                </div>
                <div className="p-3 bg-background/60 rounded-lg">
                  <p className="font-semibold text-blue-700 dark:text-blue-400">Fue la primera reserva de Costa Rica</p>
                  <p className="text-muted-foreground">It was Costa Rica's first reserve</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tours Section */}
        <Card className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-background to-secondary/5 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Available Experiences</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 px-6 flex flex-col items-start gap-2 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:border-amber-500 transition-all"
            >
              <span className="font-semibold">Guided Hiking Tour</span>
              <span className="text-sm text-muted-foreground">4-hour trek to pristine beaches with naturalist guide</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 px-6 flex flex-col items-start gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-500 transition-all"
            >
              <span className="font-semibold">Conservation History Tour</span>
              <span className="text-sm text-muted-foreground">Learn about the Wessberg legacy and early conservation efforts</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 px-6 flex flex-col items-start gap-2 hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-500 transition-all"
            >
              <span className="font-semibold">Wildlife Photography Walk</span>
              <span className="text-sm text-muted-foreground">Early morning tour for spotting monkeys and birds</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 px-6 flex flex-col items-start gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:border-purple-500 transition-all"
            >
              <span className="font-semibold">Beach & Snorkeling</span>
              <span className="text-sm text-muted-foreground">Explore marine protected areas and coastal tide pools</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CaboBlancoSite;
