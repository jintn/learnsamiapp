import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Volume2 } from "lucide-react";

interface FlashCardProps {
  word: string;
  translation: string;
  onFlip?: () => void;
  isFlipped?: boolean;
}

export const FlashCard = ({ word, translation, onFlip, isFlipped: externalIsFlipped }: FlashCardProps) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);
  const isFlipped = externalIsFlipped !== undefined ? externalIsFlipped : internalIsFlipped;

  const handleFlip = () => {
    if (externalIsFlipped === undefined) {
      setInternalIsFlipped(!internalIsFlipped);
    }
    onFlip?.();
  };

  return (
    <div 
      onClick={handleFlip}
      className="relative w-full max-w-md h-64 cursor-pointer perspective-1000"
    >
      <div 
        className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ 
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {/* Front */}
        <Card 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden bg-gradient-to-br from-card to-secondary border-2 border-primary shadow-[var(--shadow-card)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Volume2 className="w-8 h-8 text-primary mb-4" />
          <h2 className="text-4xl font-bold text-center text-foreground">{word}</h2>
          <p className="text-sm text-muted-foreground mt-4">Tap to reveal</p>
        </Card>

        {/* Back */}
        <Card 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden bg-gradient-to-br from-accent to-[hsl(162_76%_45%)] border-2 border-accent shadow-[var(--shadow-success)] [transform:rotateY(180deg)]"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-4xl font-bold text-center text-accent-foreground">{translation}</h2>
          <p className="text-sm text-accent-foreground/80 mt-4">Tap to flip back</p>
        </Card>
      </div>
    </div>
  );
};
