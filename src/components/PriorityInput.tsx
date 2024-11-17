import { FC, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { Option } from '../types/quiz';

type Props = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
};

export const PriorityInput: FC<Props> = ({ options, value = [], onChange }) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    if (value.length === 0) {
      onChange(options.map(opt => opt.value));
    }
  }, [options, value.length, onChange]);

  const handleDragStart = (position: number) => {
    dragItem.current = position;
  };

  const handleDragEnter = (position: number) => {
    dragOverItem.current = position;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const newValue = [...value];
    const draggedItemValue = newValue[dragItem.current];
    newValue.splice(dragItem.current, 1);
    newValue.splice(dragOverItem.current, 0, draggedItemValue);
    
    dragItem.current = null;
    dragOverItem.current = null;
    
    onChange(newValue);
  };

  const orderedOptions = options.sort((a, b) => {
    const aIndex = value.indexOf(a.value);
    const bIndex = value.indexOf(b.value);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="space-y-2">
      {orderedOptions.map((option, index) => (
        <div
          key={option.value}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
          className={`flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 cursor-move hover:shadow-md transition-all duration-300 ${
            value.includes(option.value) ? 'border-blue-200' : ''
          }`}
        >
          <div className="text-gray-400 cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{option.label.split(' ')[0]}</span>
            <span className="text-gray-700 font-medium">
              {option.label.split(' ').slice(1).join(' ')}
            </span>
          </div>
          <div className="ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium">
            {value.indexOf(option.value) + 1}
          </div>
        </div>
      ))}
    </div>
  );
};