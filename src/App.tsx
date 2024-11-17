import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { QuizSidebar } from './components/QuizSidebar';
import { LanguageSelector } from './components/LanguageSelector';
import { ArrowRight, Gift, Shield, Clock, Sparkles, CheckCircle } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations';

export default function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  if (isQuizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-4 lg:gap-6">
          <div className="hidden lg:block">
            <QuizSidebar />
          </div>
          <Quiz />
        </div>
        
        {/* Mobile Footer */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 text-center py-3 bg-white/80 backdrop-blur-sm border-t border-gray-100">
          <span className="text-blue-600 font-semibold">{t.header.madeIn} </span>
          <span className="font-bold text-gray-900">QuizDo</span>
        </div>
        
        {/* Add padding to prevent content from being hidden behind the footer on mobile */}
        <div className="lg:hidden h-16"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-center">
            <span className="text-blue-600 font-semibold">{t.header.madeIn} </span>
            <span className="font-bold text-gray-900">QuizDo</span>
          </div>
          <LanguageSelector />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4 md:mb-6">
            <Sparkles className="w-4 h-4" />
            {t.hero.specialOffer}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t.hero.subtitle}
          </p>

          <button
            onClick={() => setIsQuizStarted(true)}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 button-shine relative overflow-hidden transform hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t.cta}
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm scale-in border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {t.features.quickCalculation.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {t.features.quickCalculation.description}
                </p>
                <ul className="space-y-2">
                  {t.features.quickCalculation.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm scale-in border border-gray-100 hover:shadow-md transition-all duration-300 [animation-delay:200ms]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {t.features.yourBonuses.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                  {t.features.yourBonuses.description}
                </p>
                <ul className="space-y-2">
                  {t.features.yourBonuses.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">
              {t.security}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}