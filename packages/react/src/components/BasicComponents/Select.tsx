import React from 'react';
import { FormComponent } from '../../types';

interface SelectProps {
  component: FormComponent;
  value?: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ 
  component, 
  value = '', 
  onChange 
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={component.required}
      >
        <option value="">Select an option</option>
        {component.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};