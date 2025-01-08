import { GridColumnConfig } from '../../../../types/form';

export const getColumnClasses = (config: GridColumnConfig): string => {
  const classes: string[] = [];

  // Basic column size
  classes.push(`col-${config.size}`);

  // Responsive sizes
  if (config.sm) classes.push(`col-sm-${config.sm}`);
  if (config.md) classes.push(`col-md-${config.md}`);
  if (config.lg) classes.push(`col-lg-${config.lg}`);
  if (config.xl) classes.push(`col-xl-${config.xl}`);

  // Offset classes
  if (config.offset) classes.push(`offset-${config.offset}`);
  if (config.offsetSm) classes.push(`offset-sm-${config.offsetSm}`);
  if (config.offsetMd) classes.push(`offset-md-${config.offsetMd}`);
  if (config.offsetLg) classes.push(`offset-lg-${config.offsetLg}`);
  if (config.offsetXl) classes.push(`offset-xl-${config.offsetXl}`);

  // Order classes
  if (config.order) classes.push(`order-${config.order}`);
  if (config.orderSm) classes.push(`order-sm-${config.orderSm}`);
  if (config.orderMd) classes.push(`order-md-${config.orderMd}`);
  if (config.orderLg) classes.push(`order-lg-${config.orderLg}`);
  if (config.orderXl) classes.push(`order-xl-${config.orderXl}`);

  return classes.join(' ');
};