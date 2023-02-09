export interface Order {
  order_id: string;
  customer_email: string;
}

export interface Product {
  simple_sku: string;
  name: string;
  price: string;
  special_price: string;
  url: string;
}

export interface OrderItem {
  order_id: string;
  sku: string;
}

export interface FormattedOrderData {
  order_id: string
  customer_email: string
  order_items: (OrderItem & {product: Product | undefined})[]
}