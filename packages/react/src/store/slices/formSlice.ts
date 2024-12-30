import { createSlice } from '@reduxjs/toolkit';
import { FormState } from '../../types';
import { addComponentReducer } from './reducers/addComponentReducer';
import { removeComponentReducer } from './reducers/removeComponentReducer';
import { setSelectedComponentReducer } from './reducers/setSelectedComponentReducer';

const initialState: FormState = {
  components: [],
  selectedComponent: null,
  draggedComponent: null,
  orientation: 'horizontal',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addComponent: addComponentReducer,
    removeComponent: removeComponentReducer,
    setSelectedComponent: setSelectedComponentReducer
  }
});

export const { addComponent, removeComponent, setSelectedComponent } = formSlice.actions;

export default formSlice.reducer;