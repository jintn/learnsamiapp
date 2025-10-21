import { Card } from "@/components/ui/card";
import { Trophy, Target, Flame } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  streak: number;
  correct: number;
  total: number;
}

export const ScoreDisplay = ({ score, streak, correct, total }: ScoreDisplayProps) => {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <Card className="p-4 bg-gradient-to-br from-card to-secondary border-2 border-border hover:border-primary transition-colors">
        <div className="flex flex-col items-center space-y-2">
          <Trophy className="w-6 h-6 text-primary" />
          <p className="text-2xl font-bold text-foreground">{score}</p>
          <p className="text-xs text-muted-foreground">Points</p>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-card to-secondary border-2 border-border hover:border-accent transition-colors">
        <div className="flex flex-col items-center space-y-2">
          <Flame className="w-6 h-6 text-accent" />
          <p className="text-2xl font-bold text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-card to-secondary border-2 border-border hover:border-primary transition-colors">
        <div className="flex flex-col items-center space-y-2">
          <Target className="w-6 h-6 text-primary" />
          <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">Accuracy</p>
        </div>
      </Card>
    </div>
  );
};
