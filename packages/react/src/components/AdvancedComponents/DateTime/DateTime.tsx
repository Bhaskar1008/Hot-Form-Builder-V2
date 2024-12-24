import React from 'react';
import { FormComponent } from '../../../types';

interface DateTimeProps {
  component: FormComponent;
  onChange?: (value: string) => void;
  value?: string;
}

const DateTime: React.FC<DateTimeProps> = ({ component, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className="hotform-label">
        {component.label}
        {component.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="datetime-local"
        className="hotform-input"
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default DateTime;