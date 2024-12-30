import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../types';

export const addComponentReducer = (
  state: FormState,
  action: PayloadAction<FormComponent>
) => {
  const component = action.payload;
  
  if (!component.parentId) {
    state.components.push(component);
    return;
  }

  const addToNestedComponents = (components: FormComponent[]): boolean => {
    for (const comp of components) {
      if (comp.id === component.parentId) {
        if (!comp.children) {
          comp.children = [];
        }
        comp.children.push(component);
        return true;
      }
      
      if (comp.children?.length) {
        if (addToNestedComponents(comp.children)) {
          return true;
        }
      }
    }
    return false;
  };

  if (!addToNestedComponents(state.components)) {
    state.components.push(component);
  }
};