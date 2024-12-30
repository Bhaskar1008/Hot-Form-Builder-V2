import { PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../../types';

const removeFromComponents = (components: FormComponent[], id: string): boolean => {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components.splice(i, 1);
      return true;
    }
    
    const children = components[i].children;
    if (children && children.length > 0) {
      if (removeFromComponents(children, id)) {
        return true;
      }
    }
  }
  return false;
};

export const removeComponentReducer = (
  state: FormState,
  action: PayloadAction<string>
) => {
  const id = action.payload;
  removeFromComponents(state.components, id);
  
  if (state.selectedComponent === id) {
    state.selectedComponent = null;
  }
};