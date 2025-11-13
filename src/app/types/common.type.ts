export interface MatOptions {
  label: string;
  value: string;
}

export interface MatKeyOptions {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Key: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Value: string;
}
export interface Product {
  id: string;
  name: string;
  data: ProductData[];
}

export interface ProductData {
  color: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'capacity GB': number;
}
