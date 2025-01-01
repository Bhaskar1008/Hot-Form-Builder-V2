import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PanelStore } from './types/panel';
import { createPanelSlice } from './slices/panelSlice';

export const useStore = create<PanelStore>()(
  persist(
    (...args) => ({
      ...createPanelSlice(...args),
    }),
    {
      name: 'form-builder-store',
    }
  )
);
