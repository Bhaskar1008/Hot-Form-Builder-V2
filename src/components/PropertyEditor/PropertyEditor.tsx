import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateComponent } from '../../redux/slices/formSlice';
import { FormComponent } from '../../types/form';
import { Settings, Database, ShieldCheck, Wand2 } from 'lucide-react';
import classNames from 'classnames';
import DisplayTab from './PropertyTabs/DisplayTab';
import TabsDisplayTab from './PropertyTabs/TabsDisplayTab';
import DataTab from './PropertyTabs/DataTab';
import ValidationTab from './PropertyTabs/ValidationTab';

interface PropertyEditorProps {
  componentId: string | null;
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ componentId }) => {
  const [activeTab, setActiveTab] = useState('display');
  const dispatch = useDispatch();
  
  const component = useSelector((state: RootState) => {
    // First check main components
    const mainComponent = state.form.components.find(c => c.id === componentId);
    if (mainComponent) return mainComponent;

    // Then check children of container components
    for (const parent of state.form.components) {
      if ((parent.type === 'table' || parent.type === 'tabs') && parent.children) {
        const child = parent.children.find(c => c.id === componentId);
        if (child) return child;
      }
    }
    return null;
  });

  if (!component) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-lg mb-2">No Component Selected</p>
        <p className="text-sm">Select a component to edit its properties</p>
      </div>
    );
  }

  const handleChange = (updates: Partial<FormComponent>) => {
    dispatch(updateComponent({ id: component.id, updates }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'display':
        return component.type === 'tabs' 
          ? <TabsDisplayTab component={component} onChange={handleChange} />
          : <DisplayTab component={component} onChange={handleChange} />;
      case 'data':
        return <DataTab component={component} onChange={handleChange} />;
      case 'validation':
        return <ValidationTab component={component} onChange={handleChange} />;
      default:
        return null;
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="h-full flex flex-col">
      {/* ... existing JSX ... */}
    </div>
  );
};

export default PropertyEditor;