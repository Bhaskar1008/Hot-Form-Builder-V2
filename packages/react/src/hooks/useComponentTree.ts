import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { FormComponent } from '../types';
import { addComponent } from '../store/slices/formSlice';
import { getNestedComponents } from '../utils/componentTree';
import { v4 as uuidv4 } from 'uuid';

export const useComponentTree = (parentId: string) => {
  const dispatch = useDispatch();
  
  const components = useSelector((state: RootState) => 
    getNestedComponents(state.form.components, parentId)
  );

  const handleAddComponent = useCallback((component: FormComponent) => {
    const newComponent = {
      ...component,
      id: uuidv4(),
      parentId,
    };
    dispatch(addComponent(newComponent));
  }, [dispatch, parentId]);

  return {
    components,
    addComponent: handleAddComponent
  };
};