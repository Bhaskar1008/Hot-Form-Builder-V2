import React from 'react';
import { useDispatch } from 'react-redux';
import { removeComponent, setSelectedComponent } from '../../../redux/slices/formSlice';
import { useComponentTree } from '../../../hooks/useComponentTree';
import { useDropTarget } from '../../../hooks/useDropTarget';
import { CellDropZone } from './components/CellDropZone';
import { CellComponent } from './components/CellComponent';
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
  const [{ isOver, canDrop }, drop] = useDropTarget({ onDrop: addComponent });

  return (
    <td 
      ref={drop}
      className={classNames(
        'relative p-4 align-top min-h-[120px]',
        showBorders && 'border border-gray-200',
        (isOver && canDrop) && 'bg-blue-50 ring-2 ring-blue-400'
      )}
    >
      <div className="space-y-2">
        {components.map((component) => (
          <CellComponent
            key={component.id}
            component={component}
            onSelect={() => dispatch(setSelectedComponent(component.id))}
            onRemove={() => dispatch(removeComponent(component.id))}
          />
        ))}
        {(!components.length || isOver) && (
          <CellDropZone onDrop={addComponent} />
        )}
      </div>
    </td>
  );
};

export default TableCell;