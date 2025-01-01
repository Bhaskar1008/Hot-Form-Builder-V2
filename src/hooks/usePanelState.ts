import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleComponentPanel, togglePropertiesPanel, setPanelStates } from '../store/slices/panelSlice';

export const usePanelState = () => {
  const dispatch = useDispatch();
  const { isComponentPanelOpen, isPropertiesPanelOpen } = useSelector(
    (state: RootState) => state.panel
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