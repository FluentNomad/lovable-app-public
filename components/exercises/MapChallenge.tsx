import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, X, MapPin } from "lucide-react";
import costaRicaMap from "@/assets/costa-rica-volcanoes-map.jpg";

interface MapChallengeProps {
  volcanoName: string;
  correctRegion: string;
  regions: { name: string; position: { top: string; left: string } }[];
  points: number;
  onComplete: (points: number) => void;
  completed?: boolean;
}

export function MapChallenge({ volcanoName, correctRegion, regions, points, onComplete, completed }: MapChallengeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleRegionClick = (regionName: string) => {
    if (completed) return;
    setSelected(regionName);
    const correct = regionName === correctRegion;
    setIsCorrect(correct);
    if (correct && !completed) {
      setTimeout(() => onComplete(points), 800);
    }
  };

  return (
    <Card className={completed ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>🗺️ Map Challenge</span>
          {completed && <CheckCircle2 className="h-5 w-5 text-green-600" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">¿Dónde está {volcanoName}?</p>
        <p className="text-xs text-muted-foreground italic">Where is {volcanoName}?</p>
        
        <div className="relative rounded-lg overflow-hidden border-2 border-border">
          <img 
            src={costaRicaMap} 
            alt="Costa Rica Map" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0">
            {regions.map((region) => (
              <button
                key={region.name}
                onClick={() => handleRegionClick(region.name)}
                disabled={completed}
                className={`absolute w-16 h-16 -ml-8 -mt-8 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${
                  selected === region.name
                    ? isCorrect
                      ? "bg-green-500 border-green-600 scale-110"
                      : "bg-destructive border-destructive-foreground scale-110"
                    : completed && region.name === correctRegion
                    ? "bg-green-500 border-green-600"
                    : "bg-primary/80 border-primary hover:bg-primary hover:scale-110 backdrop-blur-sm"
                }`}
                style={{ top: region.position.top, left: region.position.left }}
                aria-label={`Select ${region.name}`}
              >
                <MapPin className="h-6 w-6 text-white" />
              </button>
            ))}
          </div>
        </div>

        {isCorrect === true && (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" /> ¡Correcto! +{points} points
          </div>
        )}
        {isCorrect === false && (
          <div className="flex items-center gap-2 text-destructive text-sm font-medium">
            <X className="h-4 w-4" /> Try again!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
