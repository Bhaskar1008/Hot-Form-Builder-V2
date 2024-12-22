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
  const [isMobileToolboxOpen, setIsMobileToolboxOpen] = useState(false);

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className={classNames(
        'h-full',
        isHorizontal ? 'flex' : 'grid grid-cols-1 lg:grid-cols-[320px_1fr]'
      )}>
        {/* Mobile Toolbox Toggle */}
        {!isPreviewMode && (
          <button
            className="lg:hidden fixed bottom-4 left-4 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg"
            onClick={() => setIsMobileToolboxOpen(!isMobileToolboxOpen)}
          >
            <ArrowLeftRight className="w-6 h-6" />
          </button>
        )}

        {/* Left Panel - Component Toolbox */}
        {!isPreviewMode && (
          <div className={classNames(
            'bg-white shadow-lg',
            'transition-transform duration-300 ease-in-out',
            'fixed lg:relative',
            'h-full z-40',
            isHorizontal ? 'w-80' : 'w-80',
            isMobileToolboxOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}>
            <ComponentToolbox orientation={orientation} />
          </div>
        )}
        
        {/* Main Content Area */}
        <div className={classNames(
          'flex flex-col lg:flex-row',
          'h-full w-full overflow-hidden',
          isHorizontal ? 'flex-1' : ''
        )}>
          {/* Form Canvas / Preview */}
          <div className={classNames(
            'flex-1 overflow-auto',
            'p-4 lg:p-6'
          )}>
            <div className="sticky top-0 z-10 flex justify-between items-center mb-4 bg-gray-50/80 backdrop-blur-sm p-3 rounded-lg">
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
                {isPreviewMode ? 'Form Preview' : 'Form Builder'}
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className={classNames(
                    'flex items-center px-3 lg:px-4 py-2 rounded-md transition-colors',
                    'text-sm font-medium',
                    isPreviewMode
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {isPreviewMode ? (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Edit</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Preview</span>
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

            <div className="bg-white rounded-xl shadow-lg min-h-[calc(100vh-12rem)] p-4 lg:p-6 border border-gray-200">
              {isPreviewMode ? (
                <FormPreview />
              ) : (
                <DropZone components={components} />
              )}
            </div>
          </div>
          
          {/* Property Editor */}
          {!isPreviewMode && selectedComponent && (
            <div className={classNames(
              'bg-white shadow-lg',
              'transition-all duration-300 ease-in-out',
              isHorizontal 
                ? 'w-full lg:w-96 h-80 lg:h-full' 
                : 'w-full lg:w-96 h-80 lg:h-full'
            )}>
              <PropertyEditor componentId={selectedComponent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;