import React, { useState } from 'react';
import { FormComponent } from '../types';
import { componentMap } from '../utils/componentMap';

export interface HotFormProps {
  src: {
    components: FormComponent[];
  };
  onSubmit?: (data: any) => void;
  onChange?: (data: any) => void;
}

export const HotForm: React.FC<HotFormProps> = ({ src, onSubmit, onChange }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (id: string, value: any) => {
    const newData = { ...formData, [id]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  const renderComponent = (component: FormComponent): React.ReactNode => {
    const Component = componentMap[component.type];
    if (!Component) return null;

    if (['container', 'table', 'tabs', 'collapse'].includes(component.type)) {
      return (
        <Component
          key={component.id}
          component={component}
          renderComponent={renderComponent}
        />
      );
    }

    return (
      <Component
        key={component.id}
        component={component}
        value={formData[component.id]}
        onChange={(value: any) => handleChange(component.id, value)}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {src.components.map(renderComponent)}
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};