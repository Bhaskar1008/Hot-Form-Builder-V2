import React from 'react';
import { FormComponent } from '../../types';

interface TextFieldProps {
  component: FormComponent;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  component, 
  value = '', 
  onChange 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={component.placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={component.required}
      />
    </div>
  );
};