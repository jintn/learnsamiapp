import { Card } from "@/components/ui/card";
import { Home } from "lucide-react";

interface HouseBuilderProps {
  progress: number; // 0-7 stages
  isAnimating?: boolean;
}

export const HouseBuilder = ({ progress, isAnimating = false }: HouseBuilderProps) => {
  const stages = [
    { id: 0, name: "Foundation", color: "fill-muted" },
    { id: 1, name: "Left Wall", color: "fill-primary" },
    { id: 2, name: "Right Wall", color: "fill-primary" },
    { id: 3, name: "Door", color: "fill-accent" },
    { id: 4, name: "Left Window", color: "fill-secondary" },
    { id: 5, name: "Right Window", color: "fill-secondary" },
    { id: 6, name: "Roof", color: "fill-destructive" },
    { id: 7, name: "Chimney", color: "fill-muted-foreground" },
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-secondary border border-border overflow-hidden relative">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200/20 to-green-200/20 -z-10" />
      
      {/* Progress Label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">House: {progress}/8</h3>
        </div>
      </div>

      {/* House SVG */}
      <div className={`flex justify-center ${isAnimating ? 'animate-pulse' : ''}`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full max-w-[200px] h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground */}
          <rect x="0" y="180" width="200" height="20" className="fill-green-600/40" />
          
          {/* Foundation - Stage 0 */}
          {progress >= 1 && (
            <rect
              x="50"
              y="160"
              width="100"
              height="10"
              className={`${stages[0].color} transition-all duration-500`}
              style={{ animation: progress === 1 && isAnimating ? 'scale-in 0.5s ease-out' : 'none' }}
            />
          )}

          {/* Left Wall - Stage 1 */}
          {progress >= 2 && (
            <rect
              x="50"
              y="100"
              width="10"
              height="60"
              className={`${stages[1].color} transition-all duration-500`}
              style={{ animation: progress === 2 && isAnimating ? 'slide-in-right 0.5s ease-out' : 'none' }}
            />
          )}

          {/* Right Wall - Stage 2 */}
          {progress >= 3 && (
            <rect
              x="140"
              y="100"
              width="10"
              height="60"
              className={`${stages[2].color} transition-all duration-500`}
              style={{ animation: progress === 3 && isAnimating ? 'slide-in-right 0.5s ease-out' : 'none' }}
            />
          )}

          {/* Back Wall */}
          {progress >= 3 && (
            <rect
              x="60"
              y="100"
              width="80"
              height="60"
              className="fill-primary/60 transition-all duration-500"
            />
          )}

          {/* Door - Stage 3 */}
          {progress >= 4 && (
            <g style={{ animation: progress === 4 && isAnimating ? 'scale-in 0.5s ease-out' : 'none' }}>
              <rect
                x="85"
                y="130"
                width="30"
                height="30"
                className={`${stages[3].color} transition-all duration-500`}
              />
              <circle cx="108" cy="145" r="2" className="fill-foreground" />
            </g>
          )}

          {/* Left Window - Stage 4 */}
          {progress >= 5 && (
            <g style={{ animation: progress === 5 && isAnimating ? 'scale-in 0.5s ease-out' : 'none' }}>
              <rect
                x="65"
                y="115"
                width="15"
                height="15"
                className="fill-blue-400/80 transition-all duration-500"
              />
              <line x1="72.5" y1="115" x2="72.5" y2="130" className="stroke-foreground stroke-1" />
              <line x1="65" y1="122.5" x2="80" y2="122.5" className="stroke-foreground stroke-1" />
            </g>
          )}

          {/* Right Window - Stage 5 */}
          {progress >= 6 && (
            <g style={{ animation: progress === 6 && isAnimating ? 'scale-in 0.5s ease-out' : 'none' }}>
              <rect
                x="120"
                y="115"
                width="15"
                height="15"
                className="fill-blue-400/80 transition-all duration-500"
              />
              <line x1="127.5" y1="115" x2="127.5" y2="130" className="stroke-foreground stroke-1" />
              <line x1="120" y1="122.5" x2="135" y2="122.5" className="stroke-foreground stroke-1" />
            </g>
          )}

          {/* Roof - Stage 6 */}
          {progress >= 7 && (
            <polygon
              points="100,60 45,100 155,100"
              className={`${stages[6].color} transition-all duration-500`}
              style={{ animation: progress === 7 && isAnimating ? 'scale-in 0.5s ease-out' : 'none' }}
            />
          )}

          {/* Chimney - Stage 7 */}
          {progress >= 8 && (
            <g style={{ animation: progress === 8 && isAnimating ? 'slide-in-right 0.5s ease-out' : 'none' }}>
              <rect
                x="120"
                y="65"
                width="12"
                height="20"
                className={`${stages[7].color} transition-all duration-500`}
              />
              {/* Smoke */}
              <circle cx="126" cy="58" r="3" className="fill-muted-foreground/40 animate-pulse" />
              <circle cx="128" cy="52" r="2.5" className="fill-muted-foreground/30 animate-pulse" />
              <circle cx="124" cy="50" r="2" className="fill-muted-foreground/20 animate-pulse" />
            </g>
          )}
        </svg>
      </div>

      {/* Stage Names */}
      <div className="mt-2">
        <div className="text-xs text-center text-muted-foreground">
          {progress < 8 ? `Next: ${stages[progress]?.name}` : "Complete! 🎉"}
        </div>
      </div>
    </Card>
  );
};
