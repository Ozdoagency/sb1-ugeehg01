import type { FC } from 'react';
import { MessageCircle, MessageSquare, Phone } from 'lucide-react';

type Props = {
  options: string[];
  selectedMessenger: string | null;
  onSelect: (messenger: string) => void;
};

const messengerIcons: { [key: string]: JSX.Element } = {
  WhatsApp: <MessageCircle className="w-5 h-5 text-green-500" />,
  Telegram: <MessageSquare className="w-5 h-5 text-blue-500" />,
  Viber: <Phone className="w-5 h-5 text-purple-500" />
};

export const MessengerSelect: FC<Props> = ({ options, selectedMessenger, onSelect }) => {
  return (
    <div className="flex justify-center gap-6">
      {options.map((name, index) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className={`group p-6 rounded-xl border transition-all duration-500 hover:-translate-y-1 ${
            selectedMessenger === name 
              ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
          style={{
            animation: `fadeInScale 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`transform transition-transform duration-500 ${
              selectedMessenger === name ? 'scale-110' : 'group-hover:scale-110'
            }`}>
              {messengerIcons[name]}
            </div>
            <span className={`font-medium transition-colors duration-300 ${
              selectedMessenger === name ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {name}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};