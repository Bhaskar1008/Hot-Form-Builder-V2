import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { toggleOrientation } from '../../redux/slices/formSlice';
import { FormComponent } from '../../types/form';
import { 
  TextCursor, 
  CheckSquare, 
  CircleDot, 
  ListOrdered,
  Calendar,
  Upload,
  PenTool,
  Hash,
  Tags,
  LayoutGrid,
  Table2,
  Layers,
  FolderTree,
  ArrowLeftRight,
  ArrowUpDown
} from 'lucide-react';
import classNames from 'classnames';

interface TabConfig {
  id: string;
  label: string;
  icon: React.FC<any>;
  components: Array<{
    type: string;
    label: string;
    icon: React.FC<any>;
  }>;
}

const tabs: TabConfig[] = [
  {
    id: 'form',
    label: 'Form Elements',
    icon: LayoutGrid,
    components: [
      { type: 'text', label: 'Text Field', icon: TextCursor },
      { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
      { type: 'radio', label: 'Radio', icon: CircleDot },
      { type: 'select', label: 'Select', icon: ListOrdered },
    ]
  },
  {
    id: 'advanced',
    label: 'Advanced Elements',
    icon: PenTool,
    components: [
      { type: 'datetime', label: 'Date/Time', icon: Calendar },
      { type: 'fileupload', label: 'File Upload', icon: Upload },
      { type: 'signature', label: 'Signature', icon: PenTool },
      { type: 'otp', label: 'OTP', icon: Hash },
      { type: 'tags', label: 'Tags', icon: Tags },
    ]
  },
  {
    id: 'layout',
    label: 'Layout Components',
    icon: Layers,
    components: [
      { type: 'container', label: 'Container', icon: LayoutGrid },
      { type: 'table', label: 'Table', icon: Table2 },
      { type: 'tabs', label: 'Tabs', icon: Layers },
      { type: 'accordion', label: 'Accordion', icon: FolderTree },
    ]
  }
];

interface ComponentToolboxProps {
  orientation: 'horizontal' | 'vertical';
}

const ComponentToolbox: React.FC<ComponentToolboxProps> = ({ orientation }) => {
  const [activeTab, setActiveTab] = useState('form');
  const dispatch = useDispatch();

  const DraggableComponent: React.FC<{ type: string; label: string; Icon: any }> = ({ type, label, Icon }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'FORM_COMPONENT',
      item: {
        type,
        label,
        required: false,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={classNames(
          'flex items-center p-3 rounded-lg cursor-move transition-all duration-200',
          'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50',
          'hover:shadow-sm hover:scale-[1.02]',
          isDragging ? 'opacity-50 bg-gray-50' : 'bg-white'
        )}
      >
        <Icon className="w-5 h-5 mr-3 text-indigo-600" />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
        <h3 className="text-lg font-semibold text-gray-800">Components</h3>
        <button
          onClick={() => dispatch(toggleOrientation())}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title={`Switch to ${orientation === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
        >
          {orientation === 'horizontal' ? (
            <ArrowLeftRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ArrowUpDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      
      <div className={classNames(
        'flex gap-1 p-2 bg-white border-b',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
      )}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={classNames(
              'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              orientation === 'vertical' ? 'w-full justify-between' : 'flex-1',
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <div className="flex items-center">
              <tab.icon className={classNames(
                'w-4 h-4 mr-2',
                activeTab === tab.id ? 'text-white' : 'text-gray-500'
              )} />
              {tab.label}
            </div>
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={classNames(
              'space-y-2 transition-all duration-300',
              activeTab === tab.id ? 'opacity-100' : 'hidden opacity-0'
            )}
          >
            {tab.components.map((component) => (
              <DraggableComponent
                key={component.type}
                type={component.type}
                label={component.label}
                Icon={component.icon}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentToolbox;