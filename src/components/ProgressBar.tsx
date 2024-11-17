import type { FC } from 'react';

type Props = {
  currentStep: number;
  totalSteps: number;
};

export const ProgressBar: FC<Props> = ({ currentStep, totalSteps }) => {
  const progressWidth = `${((currentStep + 1) / totalSteps) * 100}%`;

  return (
    <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden relative">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 progress-bar rounded-full relative"
        style={{ 
          width: progressWidth,
        }}
      >
        <div 
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[barberpole_1s_linear_infinite]" 
        />
      </div>
    </div>
  );
};