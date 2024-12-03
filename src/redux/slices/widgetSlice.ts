import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetComponent } from '../../types/form';
import { v4 as uuidv4 } from 'uuid';

interface WidgetState {
  widgets: WidgetComponent[];
  selectedWidget: string | null;
}

const initialState: WidgetState = {
  widgets: [],
  selectedWidget: null,
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<WidgetComponent>) => {
      const widget = { ...action.payload, id: uuidv4() };
      state.widgets.push(widget);
    },
    updateWidget: (state, action: PayloadAction<{ id: string; updates: Partial<WidgetComponent> }>) => {
      const { id, updates } = action.payload;
      const widget = state.widgets.find(w => w.id === id);
      if (widget) {
        Object.assign(widget, updates);
      }
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(w => w.id !== action.payload);
    },
    setSelectedWidget: (state, action: PayloadAction<string | null>) => {
      state.selectedWidget = action.payload;
    },
  },
});

export const {
  addWidget,
  updateWidget,
  removeWidget,
  setSelectedWidget,
} = widgetSlice.actions;

export default widgetSlice.reducer;