import type { ComponentProps, LayoutComponentProps, ChartComponentProps, APIComponentProps } from '../types/form';
import { BasicComponents } from '../components/Basic';
import { AdvancedComponents } from '../components/Advanced';
import { LayoutComponents } from '../components/Layout';
import { ChartComponents } from '../components/Chart';
import { APIComponents } from '../components/API';

type ComponentType = React.FC<ComponentProps | LayoutComponentProps | ChartComponentProps | APIComponentProps>;

export const componentMap: Record<string, ComponentType> = {
  ...BasicComponents,
  ...AdvancedComponents,
  ...LayoutComponents,
  ...ChartComponents,
  ...APIComponents
};