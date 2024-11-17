import type { FC } from 'react';
import type { QuestionOption } from '../types/quiz';
import { Check } from 'lucide-react';

type Props = {
  option: QuestionOption;
  selected: boolean;
  onClick: () => void;
};

export const QuizOption: FC<Props> = ({ option, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl transition-all duration-300 option-button ${
        selected
          ? 'option-selected'
          : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{option.label.split(' ')[0]}</span>
          <span className="text-gray-700 font-medium">
            {option.label.split(' ').slice(1).join(' ')}
          </span>
        </div>
        {selected && (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center scale-in">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </button>
  );
};