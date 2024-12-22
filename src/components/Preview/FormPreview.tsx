import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { componentMap } from '../../utils/componentMap';
import { FormComponent } from '../../types/form';

const FormPreview: React.FC = () => {
  const { components } = useSelector((state: RootState) => state.form);
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const handleComponentChange = (componentId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [componentId]: value
    }));
  };

  const renderComponent = (component: FormComponent) => {
    const Component = componentMap[component.type];
    if (!Component) return null;

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
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg p-4 lg:p-6 border border-gray-200">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {components.map(renderComponent)}
          
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => setFormData({})}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-6 p-4 lg:p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Form Data</h3>
        <div className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;