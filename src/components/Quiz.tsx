import { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { QuizOption } from './QuizOption';
import { MessengerSelect } from './MessengerSelect';
import { PhoneInput } from './PhoneInput';
import { ProgressBar } from './ProgressBar';
import { RatingInput } from './RatingInput';
import { ImageChoice } from './ImageChoice';
import { RangeInput } from './RangeInput';
import { TextInput } from './TextInput';
import { DateInput } from './DateInput';
import { MatrixInput } from './MatrixInput';
import { PriorityInput } from './PriorityInput';
import { FileUpload } from './FileUpload';
import { ConsultantAvatar } from './ConsultantAvatar';
import { getQuestions } from '../data/questions';
import { countries } from '../data/countries';
import { useQuizContext } from '../context/QuizContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import type { Country, QuestionOption, Answers, ImageOption, Option, Question } from '../types/quiz';

export function Quiz() {
  const { currentStep, setCurrentStep, answers, setAnswers } = useQuizContext();
  const { language } = useLanguage();
  const questions = getQuestions(language);
  const [completed, setCompleted] = useState(false);
  const [selectedMessenger, setSelectedMessenger] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

  const t = translations[language].quiz;
  const currentQuestion = questions[currentStep];

  const handleSingleChoice = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleMultipleChoice = (value: string) => {
    setAnswers((prev: Answers) => {
      const currentAnswers = (prev[currentStep] as string[]) || [];
      return {
        ...prev,
        [currentStep]: currentAnswers.includes(value)
          ? currentAnswers.filter(item => item !== value)
          : [...currentAnswers, value]
      };
    });
  };

  const handleRatingChange = (value: number) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleImageChoice = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleRangeChange = (value: number) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleTextChange = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleDateChange = (value: string) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleMatrixChange = (value: { [key: string]: string }) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handlePriorityChange = (value: string[]) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: value }));
  };

  const handleFileUpload = (files: File[]) => {
    setAnswers((prev: Answers) => ({ ...prev, [currentStep]: files }));
  };

  const handleMessengerChoice = (messenger: string) => {
    setSelectedMessenger(messenger);
    setAnswers((prev: Answers) => ({ ...prev, messenger }));
  };

  const handlePhoneInput = (text: string) => {
    const digitsOnly = text.replace(/\D/g, '');
    setAnswers((prev: Answers) => ({ 
      ...prev, 
      phone: digitsOnly,
      countryCode: selectedCountry.code 
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
    setSelectedMessenger(null);
    setSelectedCountry(countries[0]);
  };

  const isButtonActive = () => {
    if (!currentQuestion) return false;
    
    switch (currentQuestion.type) {
      case 'single':
        return answers[currentStep] !== undefined;
      case 'multiple':
        return answers[currentStep] !== undefined && (answers[currentStep] as string[])?.length > 0;
      case 'rating':
        return answers[currentStep] !== undefined;
      case 'image-choice':
        return answers[currentStep] !== undefined;
      case 'range':
        return answers[currentStep] !== undefined;
      case 'text':
        return answers[currentStep] && (answers[currentStep] as string).length > 0;
      case 'date':
        return answers[currentStep] !== undefined;
      case 'matrix':
        return Object.keys(answers[currentStep] as { [key: string]: string } || {}).length === currentQuestion.rows?.length;
      case 'priority':
        return (answers[currentStep] as string[] || []).length === (currentQuestion.options as Option[]).length;
      case 'file-upload':
        return (answers[currentStep] as File[] || []).length > 0;
      case 'contact':
        return answers.messenger && answers.phone && answers.phone.length >= 9;
      default:
        return false;
    }
  };

  if (completed) {
    return (
      <Card className="w-full p-6 md:p-8 quiz-card animate-fadeIn">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t.completion.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {t.completion.description}
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors button-shine"
          >
            {t.completion.restart}
          </button>
        </div>
      </Card>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <Card className="w-full p-6 md:p-8 quiz-card animate-fadeIn">
      <div className="mb-8">
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={questions.length} 
        />
        
        <div className="text-left mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-4 animate-float">
            {t.question} {currentStep + 1}
          </div>
          <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 mb-2 slide-in-right">
            {currentQuestion.question}
          </h2>
          <p className="text-gray-600 slide-in-right [animation-delay:100ms]">
            {currentQuestion.description}
          </p>
        </div>

        <div className="lg:hidden mb-6 scale-in">
          <ConsultantAvatar />
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {currentQuestion.type === 'single' && (
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <QuizOption
                  key={(option as QuestionOption).value}
                  option={option as QuestionOption}
                  selected={answers[currentStep] === (option as QuestionOption).value}
                  onClick={() => handleSingleChoice((option as QuestionOption).value)}
                />
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple' && (
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <QuizOption
                  key={(option as QuestionOption).value}
                  option={option as QuestionOption}
                  selected={(answers[currentStep] as string[] || []).includes((option as QuestionOption).value)}
                  onClick={() => handleMultipleChoice((option as QuestionOption).value)}
                />
              ))}
            </div>
          )}

          {currentQuestion.type === 'rating' && (
            <RatingInput
              value={answers[currentStep] as number || 0}
              onChange={handleRatingChange}
              max={currentQuestion.max || 5}
            />
          )}

          {currentQuestion.type === 'image-choice' && (
            <ImageChoice
              options={currentQuestion.options as ImageOption[]}
              selected={answers[currentStep] as string}
              onSelect={handleImageChoice}
            />
          )}

          {currentQuestion.type === 'matrix' && (
            <MatrixInput
              rows={currentQuestion.rows || []}
              columns={currentQuestion.columns || []}
              value={answers[currentStep] as { [key: string]: string } || {}}
              onChange={handleMatrixChange}
            />
          )}

          {currentQuestion.type === 'priority' && (
            <PriorityInput
              options={currentQuestion.options as Option[]}
              value={answers[currentStep] as string[] || []}
              onChange={handlePriorityChange}
            />
          )}

          {currentQuestion.type === 'file-upload' && (
            <FileUpload
              value={answers[currentStep] as File[] || []}
              onChange={handleFileUpload}
              maxFiles={currentQuestion.maxFiles}
              acceptedFileTypes={currentQuestion.acceptedFileTypes}
            />
          )}

          {currentQuestion.type === 'range' && (
            <RangeInput
              value={answers[currentStep] as number || currentQuestion.min || 1}
              onChange={handleRangeChange}
              min={currentQuestion.min || 1}
              max={currentQuestion.max || 12}
              step={currentQuestion.step || 1}
            />
          )}

          {currentQuestion.type === 'text' && (
            <TextInput
              value={answers[currentStep] as string || ''}
              onChange={handleTextChange}
              placeholder={currentQuestion.placeholder}
            />
          )}

          {currentQuestion.type === 'date' && (
            <DateInput
              value={answers[currentStep] as string || ''}
              onChange={handleDateChange}
            />
          )}

          {currentQuestion.type === 'contact' && (
            <div className="space-y-6">
              <MessengerSelect
                options={currentQuestion.options as string[]}
                selectedMessenger={selectedMessenger}
                onSelect={handleMessengerChoice}
              />
              
              {selectedMessenger && (
                <div className="space-y-2">
                  <PhoneInput
                    selectedCountry={selectedCountry}
                    phone={answers.phone || ''}
                    onCountrySelect={setSelectedCountry}
                    onPhoneChange={handlePhoneInput}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
        <div className="text-sm text-gray-500">
          {currentStep + 1} {t.of} {questions.length}
        </div>

        <div className="flex items-center gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors interactive focus-ring rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!isButtonActive()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg relative overflow-hidden interactive focus-ring ${
              isButtonActive()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10">
              {currentStep === questions.length - 1 ? t.complete : t.next}
            </span>
            <ChevronRight className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden lg:block text-center mt-8 pt-4 border-t border-gray-100">
        <span className="text-blue-600 text-sm font-medium">{translations[language].header.madeIn} </span>
        <span className="text-gray-900 text-sm font-bold">QuizDo</span>
      </div>
    </Card>
  );
}