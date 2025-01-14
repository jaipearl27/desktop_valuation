export type Menu = {
  id: number;
  title: string;
  path?: string;
  dropdown?: {title: string, path: string}[]; 
  newTab: boolean;
  submenu?: Menu[];
};
