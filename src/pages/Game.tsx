import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { HouseBuilder } from "@/components/HouseBuilder";
import { GameFeedback } from "@/components/GameFeedback";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const vocabularyData = [
  { word: "Hello", translation: "Buorre beaivi" },
  { word: "Goodbye", translation: "Báze dearvan" },
  { word: "Thank you", translation: "Giitu" },
  { word: "Please", translation: "Mii sáhttá" },
  { word: "Yes", translation: "Juo" },
  { word: "No", translation: "Ii" },
  { word: "Water", translation: "Čáhci" },
  { word: "Food", translation: "Biebmu" },
];

const Game = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(3);
  const [answered, setAnswered] = useState(false);
  const [houseProgress, setHouseProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  const currentCard = vocabularyData[currentIndex];

  // Generate 4 options (1 correct + 3 random wrong)
  useEffect(() => {
    const correctAnswer = currentCard.translation;
    const wrongAnswers = vocabularyData
      .filter((_, idx) => idx !== currentIndex)
      .map(item => item.translation)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setSelectedAnswer("");
  }, [currentIndex]);

  const handleSubmit = () => {
    if (!answered && selectedAnswer) {
      const isCorrect = selectedAnswer === currentCard.translation;
      
      if (isCorrect) {
        setScore((prev) => prev + 10);
        setCorrect((prev) => prev + 1);
        
        // Build house
        if (houseProgress < 8) {
          setIsAnimating(true);
          setHouseProgress((prev) => prev + 1);
          setTimeout(() => setIsAnimating(false), 500);
        }
        
        setFeedback("correct");
        toast.success("Correct! Building your house! 🏠", {
          icon: "🎉",
        });
      } else {
        // Remove house part if any exist
        if (houseProgress > 0) {
          setIsAnimating(true);
          setHouseProgress((prev) => prev - 1);
          setTimeout(() => setIsAnimating(false), 500);
          toast.error("Part removed! Keep trying! 💪", {
            icon: "💥",
          });
        } else {
          toast.error("Wrong answer! Study this one!", {
            icon: "📚",
          });
        }
        
        setFeedback("incorrect");
      }
      
      nextCard();
    }
  };

  const nextCard = () => {
    setAnswered(true);
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < vocabularyData.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setAnswered(false);
      } else {
        const finalMessage = houseProgress === 8 
          ? `Perfect! House complete! 🏠 Score: ${score}` 
          : `Lesson complete! House progress: ${houseProgress}/8 - Score: ${score}`;
        
        toast.success(finalMessage, {
          icon: houseProgress === 8 ? "🏆" : "🎯",
        });
        setTimeout(() => navigate("/"), 2000);
      }
    }, 600);
  };

  return (
    <>
      <GameFeedback type={feedback} />
      <div className="min-h-screen bg-[var(--gradient-hero)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Learn Sami
          </h1>
        </div>

        {/* Progress */}
        <ProgressBar
          current={currentIndex + 1}
          total={vocabularyData.length}
          label="Lesson Progress"
        />

        {/* Score Display */}
        <ScoreDisplay
          score={score}
          streak={streak}
          correct={correct}
          total={currentIndex + 1}
        />

        {/* House Builder */}
        <HouseBuilder progress={houseProgress} isAnimating={isAnimating} />

        {/* Question */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-card border-2 border-border rounded-xl p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Translate this word:</p>
            <h2 className="text-4xl font-bold text-foreground">{currentCard.word}</h2>
          </div>

          {/* Multiple Choice Options */}
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={answered}>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 border-2 rounded-lg p-4 transition-colors ${
                    selectedAnswer === option
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 text-lg cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Submit Button */}
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={answered || !selectedAnswer}
            className="w-full"
          >
            Submit Answer
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Game;
