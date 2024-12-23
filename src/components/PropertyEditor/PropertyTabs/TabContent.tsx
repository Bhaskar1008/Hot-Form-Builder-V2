import React from 'react';
import classNames from 'classnames';

interface TabContentProps {
  orientation: 'horizontal' | 'vertical';
  children: React.ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({ orientation, children }) => {
  return (
    <div className={classNames(
      'h-full bg-white',
      orientation === 'vertical' ? 'flex-1' : 'w-full'
    )}>
      <div className="p-4 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};