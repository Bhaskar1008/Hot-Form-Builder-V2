import { FormComponent } from '../types/form';

export const findComponentById = (
  components: FormComponent[],
  id: string
): FormComponent | null => {
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children?.length) {
      const found = findComponentById(component.children, id);
      if (found) return found;
    }
  }
  return null;
};

export const findParentComponent = (
  components: FormComponent[],
  childId: string
): FormComponent | null => {
  for (const component of components) {
    // Check if this is a table cell parent
    if (component.type === 'table' && childId.startsWith('cell-')) {
      return component;
    }
    
    // Check if this is a tabs parent
    if (component.type === 'tabs' && childId.includes(component.id)) {
      return component;
    }
    
    // Check direct children
    if (component.children?.some(child => child.id === childId)) {
      return component;
    }
    
    // Check nested children
    if (component.children?.length) {
      const found = findParentComponent(component.children, childId);
      if (found) return found;
    }
  }
  return null;
};

export const updateComponentInTree = (
  components: FormComponent[],
  id: string,
  updates: Partial<FormComponent>
): boolean => {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components[i] = { ...components[i], ...updates };
      return true;
    }
    if (components[i].children?.length) {
      if (updateComponentInTree(components[i].children, id, updates)) {
        return true;
      }
    }
  }
  return false;
};

export const removeComponentFromTree = (
  components: FormComponent[],
  id: string
): boolean => {
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      components.splice(i, 1);
      return true;
    }
    if (components[i].children?.length) {
      if (removeComponentFromTree(components[i].children, id)) {
        if (components[i].children.length === 0) {
          delete components[i].children;
        }
        return true;
      }
    }
  }
  return false;
};