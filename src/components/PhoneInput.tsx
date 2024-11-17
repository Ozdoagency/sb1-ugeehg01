import React from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { Country } from '../types/quiz';
import { countries } from '../data/countries';

type Props = {
  selectedCountry: Country;
  phone: string;
  onCountrySelect: (country: Country) => void;
  onPhoneChange: (phone: string) => void;
};

export function PhoneInput({ 
  selectedCountry, 
  phone, 
  onCountrySelect, 
  onPhoneChange 
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const formatPhone = (value: string = '') => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    const format = selectedCountry.format;
    let result = '';
    let digitIndex = 0;

    for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
      if (format[i] === '_') {
        result += digits[digitIndex] || '_';
        digitIndex++;
      } else {
        result += format[i];
      }
    }

    return result;
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <Phone className="w-5 h-5 text-blue-500" />
        <p className="text-sm text-blue-700">
          Введите номер телефона, и мы свяжемся с вами в выбранном мессенджере
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-full px-4 py-4 rounded-lg border flex items-center gap-2 min-w-[140px] transition-all duration-300 ${
              isOpen ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium">{selectedCountry.code}</span>
            <span className="text-gray-500">{selectedCountry.name}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`} />
          </button>
          
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg animate-fadeInDown">
              {countries.map((country, index) => (
                <button
                  key={country.code}
                  onClick={() => {
                    onCountrySelect(country);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  style={{
                    animation: `slideInRight ${0.2}s ease-out ${index * 0.03}s both`
                  }}
                >
                  <span className="font-medium">{country.code}</span>
                  <span className="ml-2 text-gray-600">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1 relative">
          <input
            type="tel"
            value={formatPhone(phone)}
            onChange={(e) => onPhoneChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={selectedCountry.format}
            className={`w-full p-4 rounded-lg border transition-all duration-300 ${
              isFocused 
                ? 'border-blue-500 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            autoFocus
          />
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-b-lg transform origin-left transition-transform duration-500 ${
            phone ? 'scale-x-100' : 'scale-x-0'
          }`} />
        </div>
      </div>
    </div>
  );
}