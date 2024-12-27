import React from 'react';
import { FormComponent } from '../../types';

interface CheckboxProps {
  component: FormComponent;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  component, 
  value = false, 
  onChange 
}) => {
  return (
    <label className="flex items-center space-x-2 mb-4">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-700">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </span>
    </label>
  );
};