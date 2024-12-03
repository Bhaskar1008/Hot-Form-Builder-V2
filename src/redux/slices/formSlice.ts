import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormComponent } from '../../types/form';
import { v4 as uuidv4 } from 'uuid';

const initialState: FormState = {
  components: [],
  selectedComponent: null,
  draggedComponent: null,
  orientation: 'horizontal',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<FormComponent>) => {
      const component = { ...action.payload, id: uuidv4() };
      state.components.push(component);
    },
    updateComponent: (state, action: PayloadAction<{ id: string; updates: Partial<FormComponent> }>) => {
      const { id, updates } = action.payload;
      const component = state.components.find(c => c.id === id);
      if (component) {
        Object.assign(component, updates);
      }
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(c => c.id !== action.payload);
    },
    setSelectedComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponent = action.payload;
    },
    setDraggedComponent: (state, action: PayloadAction<FormComponent | null>) => {
      state.draggedComponent = action.payload;
    },
    reorderComponents: (state, action: PayloadAction<FormComponent[]>) => {
      state.components = action.payload;
    },
    toggleOrientation: (state) => {
      state.orientation = state.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    },
  },
});

export const {
  addComponent,
  updateComponent,
  removeComponent,
  setSelectedComponent,
  setDraggedComponent,
  reorderComponents,
  toggleOrientation,
} = formSlice.actions;

export default formSlice.reducer;