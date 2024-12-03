import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import ComponentToolbox from './ComponentToolbox';
import DropZone from '../DropZone/DropZone';
import PropertyEditor from './PropertyEditor';
import FormPreview from '../Preview/FormPreview';
import { toggleOrientation } from '../../redux/slices/formSlice';
import { ArrowLeftRight, ArrowUpDown, Eye, Edit } from 'lucide-react';
import classNames from 'classnames';

const FormBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const { components, selectedComponent, orientation } = useSelector((state: RootState) => state.form);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={classNames(
      'h-screen bg-gradient-to-br from-gray-50 to-gray-100',
      isHorizontal ? 'flex' : 'grid grid-cols-[320px_1fr]'
    )}>
      {/* Left Panel - Component Toolbox */}
      {!isPreviewMode && (
        <div className={classNames(
          'bg-white shadow-lg',
          isHorizontal ? 'w-80' : 'col-span-1 row-span-2'
        )}>
          <ComponentToolbox orientation={orientation} />
        </div>
      )}
      
      {/* Main Content Area */}
      <div className={classNames(
        isHorizontal ? 'flex flex-1' : 'col-span-1'
      )}>
        {/* Form Canvas / Preview */}
        <div className={classNames(
          'p-6 overflow-auto',
          isHorizontal ? 'flex-1' : 'h-[calc(100vh-320px)]'
        )}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {isPreviewMode ? 'Form Preview' : 'Form Builder'}
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={classNames(
                  'flex items-center px-4 py-2 rounded-md transition-colors',
                  'text-sm font-medium',
                  isPreviewMode
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {isPreviewMode ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                )}
              </button>
              {!isPreviewMode && (
                <button
                  onClick={() => dispatch(toggleOrientation())}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title={`Switch to ${isHorizontal ? 'vertical' : 'horizontal'} layout`}
                >
                  {isHorizontal ? (
                    <ArrowUpDown className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg h-full p-6 border border-gray-200">
            {isPreviewMode ? (
              <FormPreview />
            ) : (
              <DropZone components={components} />
            )}
          </div>
        </div>
        
        {/* Property Editor */}
        {!isPreviewMode && (
          <div className={classNames(
            'bg-white shadow-lg',
            isHorizontal ? 'w-96' : 'h-[320px]'
          )}>
            <div className="h-full flex flex-col">
              <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-semibold text-gray-800">Properties</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <PropertyEditor componentId={selectedComponent} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;