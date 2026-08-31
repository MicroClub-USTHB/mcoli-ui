import { McProgress } from '../ui/mc-progress';

const progressValue = 68;
const progressMax = 100;

const stepItems = [1, 2, 3, 4];
const currentStep = 3;

export default function McProgressDemo() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Linear Progress</p>
        <McProgress value={progressValue} max={progressMax} size="md">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Upload status</span>
            <McProgress.Label />
          </div>
          <McProgress.FloatingLabel />
          <McProgress.Track />
        </McProgress>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Segmented Progress</p>
        <McProgress value={progressValue} max={progressMax} size="sm">
          <McProgress.Segments count={6} />
        </McProgress>
      </div>

      <div className="flex items-start gap-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Circle Progress</p>
          <McProgress value={progressValue} max={progressMax} size="lg">
            <McProgress.Circle showValue strokeWidth={16} />
          </McProgress>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Stepper Progress</p>
          <McProgress.Stepper orientation="vertical" size="md">
            {stepItems.map((stepNumber) => {
              let status: 'completedBackground' | 'completedBorder' | 'active' | 'inactive' =
                'inactive';

              if (stepNumber < currentStep) {
                status = 'completedBackground';
              } else if (stepNumber === currentStep) {
                status = 'active';
              }

              return (
                <div key={stepNumber} className="flex flex-col items-center">
                  <McProgress.Step status={status} size="md" step={stepNumber} completed="icon" />
                  {stepNumber < stepItems.length && (
                    <McProgress.StepLine
                      active={stepNumber < currentStep}
                      orientation="vertical"
                      size="md"
                    />
                  )}
                </div>
              );
            })}
          </McProgress.Stepper>
        </div>
      </div>
    </div>
  );
}
