import React from 'react';
import { useDispatch } from 'react-redux';
import { removeComponent, setSelectedComponent } from '../../../../../../src/redux/slices/formSlice';
import { useComponentTree } from '../../../../../../src/hooks/useComponentTree';
import { useNestedDrop } from '../../../../../../src/hooks/useNestedDrop';
import { CellComponent } from './components/CellComponent';
import { componentMap } from '../../../utils/componentMap';
import classNames from 'classnames';

interface TableCellProps {
  rowIndex: number;
  colIndex: number;
  showBorders?: boolean;
  tableId: string;
}

const TableCell: React.FC<TableCellProps> = ({ 
  rowIndex, 
  colIndex, 
  showBorders,
  tableId
}) => {
  const dispatch = useDispatch();
  const cellId = `cell-${tableId}-${rowIndex}-${colIndex}`;
  const { components, addComponent } = useComponentTree(cellId);
  const [{ isOver, canDrop }, drop] = useNestedDrop({
    parentId: cellId,
    onDrop: addComponent
  });

  return (
    <td 
      ref={drop}
      className={classNames(
        'relative p-4 align-top min-h-[120px]',
        showBorders && 'border border-gray-200',
        (isOver && canDrop) && 'bg-blue-50'
      )}
    >
      {components.map((component) => {
        const Component = componentMap[component.type];
        return Component ? (
          <CellComponent
            key={component.id}
            component={component}
            onSelect={() => dispatch(setSelectedComponent(component.id))}
            onRemove={() => dispatch(removeComponent(component.id))}
          />
        ) : null;
      })}
      
      {(!components.length || isOver) && (
        <p className="text-center text-gray-400 text-sm py-4">
          Drop components here
        </p>
      )}
    </td>
  );
};

export default TableCell;