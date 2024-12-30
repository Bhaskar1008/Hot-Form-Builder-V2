import { PayloadAction } from '@reduxjs/toolkit';
import { FormState } from '../../../types';

export const setSelectedComponentReducer = (
  state: FormState,
  action: PayloadAction<string | null>
) => {
  state.selectedComponent = action.payload;
};