import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Star } from "lucide-react";

interface RecognitionBadgeProps {
  title: string;
  totalPoints: number;
  volcanoesCompleted: number;
}

export function RecognitionBadge({ title, totalPoints, volcanoesCompleted }: RecognitionBadgeProps) {
  const getTitleIcon = () => {
    if (totalPoints >= 200) return <Trophy className="h-8 w-8 text-amber-500" />;
    if (totalPoints >= 100) return <Award className="h-8 w-8 text-blue-500" />;
    return <Star className="h-8 w-8 text-slate-400" />;
  };

  const getTitleColor = () => {
    if (totalPoints >= 200) return "from-amber-500/20 to-orange-500/20 border-amber-500/50";
    if (totalPoints >= 100) return "from-blue-500/20 to-cyan-500/20 border-blue-500/50";
    return "from-slate-500/20 to-slate-600/20 border-slate-500/50";
  };

  return (
    <Card className={`bg-gradient-to-br ${getTitleColor()}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {getTitleIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>🌋 {volcanoesCompleted}/5 volcanoes</span>
              <span>⭐ {totalPoints} points</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
