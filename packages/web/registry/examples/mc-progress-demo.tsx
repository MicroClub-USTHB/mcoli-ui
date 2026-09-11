import {
  McProgress,
  McProgressCircle,
  McProgressFloatingLabel,
  McProgressLabel,
  McProgressSegments,
  McProgressStep,
  McProgressStepLine,
  McProgressStepper,
  McProgressTrack,
} from '../ui/mc-progress';

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
            <McProgressLabel />
          </div>
          <McProgressFloatingLabel />
          <McProgressTrack />
        </McProgress>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Segmented Progress</p>
        <McProgress value={progressValue} max={progressMax} size="sm">
          <McProgressSegments count={6} />
        </McProgress>
      </div>

      <div className="flex items-start gap-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Circle Progress</p>
          <McProgress value={progressValue} max={progressMax} size="lg">
            <McProgressCircle showValue strokeWidth={16} />
          </McProgress>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Stepper Progress</p>
          <McProgressStepper orientation="vertical" size="md">
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
                  <McProgressStep status={status} size="md" step={stepNumber} completed="icon" />
                  {stepNumber < stepItems.length && (
                    <McProgressStepLine
                      active={stepNumber < currentStep}
                      orientation="vertical"
                      size="md"
                    />
                  )}
                </div>
              );
            })}
          </McProgressStepper>
        </div>
      </div>
    </div>
  );
}
