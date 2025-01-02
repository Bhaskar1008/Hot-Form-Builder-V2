import React from 'react';
import { useTranslation } from './TranslationContext';

interface TranslatedButtonProps {
  type: 'submit' | 'reset';
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

export const TranslatedButton: React.FC<TranslatedButtonProps> = ({ type, variant, onClick }) => {
  const { translate } = useTranslation();

  const className = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${className}`}
    >
      {translate(type)}
    </button>
  );
};