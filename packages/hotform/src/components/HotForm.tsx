import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { componentMap } from '../utils/componentMap';
import { FormComponent } from '../types';
import { TranslationProvider } from './Language/TranslationContext';
import { TranslatedButton } from './Language/TranslatedButton';

export interface HotFormProps {
  src: {
    components: FormComponent[];
  };
  onSubmit?: (data: Record<string, any>) => void;
  onChange?: (data: Record<string, any>) => void;
}

export const HotForm: React.FC<HotFormProps> = ({ src, onSubmit, onChange }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleComponentChange = (componentId: string, value: any) => {
    const newData = { ...formData, [componentId]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const renderComponent = (component: FormComponent): React.ReactNode => {
    const Component = componentMap[component.type];
    if (!Component) return null;

    // For layout components, use special rendering
    if (['container', 'table', 'tabs', 'collapse', 'wizard'].includes(component.type)) {
      return (
        <Component
          key={component.id}
          component={component}
          renderComponent={renderComponent}
          onChange={(value: any) => handleComponentChange(component.id, value)}
        />
      );
    }

    // For regular form components
    return (
      <div key={component.id} className="mb-4">
        <Component
          component={component}
          value={formData[component.id]}
          onChange={(value: any) => handleComponentChange(component.id, value)}
        />
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TranslationProvider>
        <form onSubmit={handleSubmit} className="space-y-6">
          {src.components.map(component => renderComponent(component))}
          
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-6 border-t">
            <TranslatedButton
              type="reset"
              variant="secondary"
              onClick={() => setFormData({})}
            />
            <TranslatedButton
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </TranslationProvider>
    </DndProvider>
  );
};