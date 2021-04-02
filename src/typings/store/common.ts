export interface I_MenuItem extends I_MenuChildrenItem {
  children?: I_MenuChildrenItem[];
}
export interface I_MenuChildrenItem {
  icon: string;
  menu_id: number;
  name: string;
  pid: number;
  url: string;
  [key: string]: any;
}
