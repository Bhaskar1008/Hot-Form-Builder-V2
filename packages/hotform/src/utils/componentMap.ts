import { BasicComponents } from '../components/Basic';
import { AdvancedComponents } from '../components/Advanced';
import { PremiumComponents } from '../components/Premium';
import { LayoutComponents } from '../components/Layout';
import { ChartComponents } from '../components/Chart';
import { APIComponents } from '../components/API';

export const componentMap = {
  // Basic Components
  ...BasicComponents,
  
  // Advanced Components
  ...AdvancedComponents,
  
  // Premium Components
  ...PremiumComponents,
  
  // Layout Components
  ...LayoutComponents,
  
  // Chart Components
  ...ChartComponents,
  
  // API Components
  ...APIComponents,
};