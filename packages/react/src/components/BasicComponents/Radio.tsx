import React from 'react';
import { FormComponent } from '../../types';

interface RadioProps {
  component: FormComponent;
  value?: string;
  onChange?: (value: string) => void;
}

export const Radio: React.FC<RadioProps> = ({ 
  component, 
  value = '', 
  onChange 
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {component.options?.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};