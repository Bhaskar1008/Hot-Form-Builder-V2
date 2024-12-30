import { FormComponent } from '../types';

export const getNestedComponents = (
  components: FormComponent[],
  parentId: string
): FormComponent[] => {
  let result: FormComponent[] = [];
  
  for (const component of components) {
    if (component.parentId === parentId) {
      result.push(component);
    }
    
    if (component.children?.length) {
      result = result.concat(getNestedComponents(component.children, parentId));
    }
  }
  
  return result;
};