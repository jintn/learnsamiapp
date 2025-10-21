import { useEffect, useState } from "react";

interface GameFeedbackProps {
  type: "correct" | "incorrect" | null;
  message?: string;
}

export const GameFeedback = ({ type, message }: GameFeedbackProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [type]);

  if (!visible || !type) return null;

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in ${
        type === "correct" ? "text-accent" : "text-destructive"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-sm border-2 border-current rounded-2xl px-8 py-6 shadow-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="text-7xl animate-bounce">
            {type === "correct" ? "🏠" : "💥"}
          </div>
          <p className="text-2xl font-bold text-center">
            {message || (type === "correct" ? "Building Up!" : "Oops!")}
          </p>
        </div>
      </div>
    </div>
  );
};
