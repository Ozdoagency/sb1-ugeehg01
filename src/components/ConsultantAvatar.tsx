import { FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const ConsultantAvatar: FC = () => {
  const { language } = useLanguage();
  const t = translations[language].quiz.consultant;

  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 shadow-sm p-4 rounded-xl">
      <div className="relative">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm">
          <img
            src="/consultant.webp"
            alt={t.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-semibold text-gray-900 truncate">
            {t.name}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
            {t.position}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {t.description}
        </p>
      </div>
    </div>
  );
};