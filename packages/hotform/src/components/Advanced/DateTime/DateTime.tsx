import React from 'react';
import { FormComponent } from '../../../types/form';

interface DateTimeProps {
  component: FormComponent;
  value?: string;
  onChange?: (value: string) => void;
}

const DateTime: React.FC<DateTimeProps> = ({ component, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="datetime-local"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DateTime;