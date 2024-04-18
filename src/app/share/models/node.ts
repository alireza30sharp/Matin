export class Nodes {
  id: number;
  name: string;
  icon: string;
  image: string;
  component: any;
  children?: Array<Nodes>;
  filter?: any;
}
export class ComponentModel {
  id: string;
  name: string;
  disabled?: boolean;
}
