import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(`/game`);
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
            Learn Sami
            <span className="block bg-gradient-to-r from-primary to-[hsl(242_83%_65%)] bg-clip-text text-transparent">
              Through Play
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            An interactive way to learn the Sami language
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleStartGame}
            className="mt-6 text-lg px-8 py-6"
          >
            Start Learning
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Index;
