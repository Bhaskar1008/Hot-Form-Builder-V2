import { useStore } from '../store';

export const usePanelState = () => {
  const {
    isComponentPanelOpen,
    isPropertiesPanelOpen,
    toggleComponentPanel,
    togglePropertiesPanel,
    setPanelStates
  } = useStore();

  return {
    isComponentPanelOpen,
    isPropertiesPanelOpen,
    toggleComponentPanel,
    togglePropertiesPanel,
    setPanelStates
  };
};