import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  toggleComponentPanel,
  togglePropertiesPanel,
  setPanelStates,
} from '../store/slices/panelSlice';

export const usePanelState = () => {
  const dispatch = useAppDispatch();
  const { isComponentPanelOpen, isPropertiesPanelOpen } = useAppSelector(
    (state) => state.panel
  );

  return {
    isComponentPanelOpen,
    isPropertiesPanelOpen,
    toggleComponentPanel: () => dispatch(toggleComponentPanel()),
    togglePropertiesPanel: () => dispatch(togglePropertiesPanel()),
    setPanelStates: (component: boolean, properties: boolean) =>
      dispatch(setPanelStates({ component, properties })),
  };
};
