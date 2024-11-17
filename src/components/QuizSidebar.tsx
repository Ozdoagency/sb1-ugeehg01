import { Gift, Lightbulb } from 'lucide-react';
import { useQuizContext } from '../context/QuizContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { getQuestions } from '../data/questions';

export function QuizSidebar() {
  const { currentStep } = useQuizContext();
  const { language } = useLanguage();
  const t = translations[language].quiz;
  const questions = getQuestions(language);
  const currentQuestion = questions[currentStep];

  return (
    <div className="space-y-4">
      {/* Консультант */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 md:mb-4 border-2 border-blue-100">
            <img
              src="/consultant.webp"
              alt={t.consultant.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-gray-900">{t.consultant.name}</h3>
          <p className="text-sm text-gray-500 mb-3 md:mb-4">{t.consultant.position}</p>
          <p className="text-sm text-gray-600">{t.consultant.description}</p>
        </div>
      </div>

      {/* Совет по текущему вопросу */}
      <div className="bg-blue-50 rounded-xl p-4 md:p-6 border border-blue-100">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">{t.tip}</h4>
            <p className="text-sm text-blue-700">
              {currentQuestion?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Гарантированные бонусы */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
        <div className="flex items-start gap-3 mb-4">
          <Gift className="w-5 h-5 text-green-600 flex-shrink-0" />
          <h4 className="font-medium text-gray-900">{t.guaranteedBonuses}</h4>
        </div>
        <ul className="space-y-3">
          {t.bonusList.map((bonus, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm">{index + 1}</span>
              </span>
              <span className="text-sm text-gray-600">{bonus}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}