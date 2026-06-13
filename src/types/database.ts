export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_status: "in_stock" | "low_stock" | "out_of_stock";
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  categories?: Pick<Category, "id" | "name" | "slug"> | null;
};

export type OrderStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  delivery_address: string | null;
  payment_method: "COD" | "bKash";
  notes: string | null;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  created_at: string;
};

export type OrderWithItems = Order & {
  order_items?: OrderItem[];
};

export type OrderInput = {
  id: string;
  customer_name: string;
  phone: string;
  delivery_address: string | null;
  payment_method: "COD" | "bKash";
  notes: string | null;
  total_amount: number;
  status: "pending";
};

export type OrderItemInput = {
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};
