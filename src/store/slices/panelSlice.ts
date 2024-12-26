import { StateCreator } from 'zustand';
import { PanelStore } from '../types/panel';

export const createPanelSlice: StateCreator<PanelStore> = (set) => ({
  isComponentPanelOpen: true,
  isPropertiesPanelOpen: true,
  toggleComponentPanel: () => 
    set((state) => ({ isComponentPanelOpen: !state.isComponentPanelOpen })),
  togglePropertiesPanel: () => 
    set((state) => ({ isPropertiesPanelOpen: !state.isPropertiesPanelOpen })),
  setPanelStates: (component, properties) => 
    set({ isComponentPanelOpen: component, isPropertiesPanelOpen: properties }),
});