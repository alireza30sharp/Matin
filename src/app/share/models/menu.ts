export interface MenuModel {
  menu_pk_id: number;
  menu_name: string;
  menu_type: menu_type;
  menu_category: string;
  menu_sub_category: string;
  menu_parent?: number;
  menu_status: string;
  menu_image_icons: any;
  menu_fontawesome_icons: any;
  menu_moon_icons?: string;
  menu_bootstrap_icons: any;
  menu_url: string;
  priority: number;
  page_fk_id: any;
}
export class sidBarModel {
  link_name: string;
  link: string;
  icon: string;
  sub_menu: sidBarModel[];
  showSubmenu: boolean;
  img: string;
  index?: number;
}

export enum menu_type {
  dropdown = 'dropdown',
  submenu = 'submenu',
  original = 'original',
}
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
