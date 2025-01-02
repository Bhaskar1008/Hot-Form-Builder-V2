import type { APIComponentProps } from '../../types/form';
import RestAPITrigger from './RestAPITrigger/RestAPITrigger';

export type RestAPITriggerComponent = React.FC<APIComponentProps>;

export const APIComponents: Record<string, React.FC<APIComponentProps>> = {
  'rest-api': RestAPITrigger
};

export { RestAPITrigger };