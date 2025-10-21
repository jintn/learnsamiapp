import { Card } from "@/components/ui/card";
import { Flag } from "lucide-react";

interface LanguageCardProps {
  name: string;
  nativeName: string;
  flag: string;
  lessonsCount: number;
  onClick: () => void;
}

export const LanguageCard = ({ name, nativeName, flag, lessonsCount, onClick }: LanguageCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:scale-105 bg-gradient-to-br from-card to-secondary border-2 border-transparent hover:border-primary"
    >
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
            {flag}
          </div>
          <Flag className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{nativeName}</p>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground">
            {lessonsCount} lessons available
          </p>
        </div>
      </div>
    </Card>
  );
};
