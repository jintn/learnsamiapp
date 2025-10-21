import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressBar = ({ current, total, label }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2 w-full">
      {label && (
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm font-semibold text-primary">
            {current}/{total}
          </p>
        </div>
      )}
      <Progress value={percentage} className="h-3" />
    </div>
  );
};
