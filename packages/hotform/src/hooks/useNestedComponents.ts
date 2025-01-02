import { useCallback } from 'react';
import { FormComponent } from '../types/form';

export const useNestedComponents = (parentId: string) => {
  const findNestedComponents = useCallback((components: FormComponent[]): FormComponent[] => {
    let result: FormComponent[] = [];
    
    for (const component of components) {
      if (component.parentId === parentId) {
        result.push(component);
      }
      
      if (component.children?.length) {
        result = result.concat(findNestedComponents(component.children));
      }
    }
    
    return result;
  }, [parentId]);

  return findNestedComponents;
};