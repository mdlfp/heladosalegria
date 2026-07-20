export type MenuCategory =
  | "helados"

export interface MenuItemVariant {
  label: string; // "CH", "M", "G", "EG"
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: number; // usar si tiene precio único
  variants?: MenuItemVariant[]; // usar si tiene precios por tamaño
  category: MenuCategory;
  featured?: boolean;
}