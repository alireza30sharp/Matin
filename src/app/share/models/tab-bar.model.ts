import { ComponentModel } from './node';

export interface ITabBarModel {
  name: string;
  component?: any;
  filter?: any;
  index?: number;
  dbClick?: boolean;
  label?: string;
  columnState?: any;
  isAutoSave?: boolean;
}
export enum type_menu_label {
  company = 'company',
  report = 'report',
  dashboard = 'dashboard',
}

export const components: Array<ComponentModel> = [
  { id: 'company', name: 'company' },
  { id: 'report', name: 'report' },
  { id: 'dashboard', name: 'dashboard' },
];
