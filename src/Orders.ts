import { FormattedOrderData, OrderItem, Product } from "./types";

export class Order {
  order_id: string;
  customer_email: string;
  order_items: (OrderItem & { product: Product | undefined })[];

  constructor(order: FormattedOrderData) {
    const { order_id, customer_email, order_items } = order;
    this.order_id = order_id;
    this.customer_email = customer_email;
    this.order_items = order_items;
  }
}

export class Orders {
  orders: Order[];
  constructor() {
    this.orders = [];
  }

  newOrder(order: FormattedOrderData) {
    const newOrder = new Order(order);
    this.orders.push(newOrder);
    return newOrder;
  }

  newOrders(orders: FormattedOrderData[]) {
    orders.forEach((order) => {
      this.newOrder(order);
    });
  }

  getOrderData() {
    return this.orders.map((order) => {
      const order_id = order.order_id;
      const order_total = order.order_items.reduce((itemAcc, currItem) => {
        itemAcc += parseFloat(currItem.product?.price || "");
        return itemAcc;
      }, 0);
      return { order_id, order_total };
    });
  }

  getById(order_id: string) {
    return this.orders.find(({ order_id: orderId }) => orderId === order_id);
  }

  getByEmail(email: string) {
    return this.orders.find(
      ({ customer_email: customer_email }) => customer_email === email
    );
  }

  getOrders() {
    return this.orders.sort((a, b) => Number(a.order_id) - Number(b.order_id));
  }

  getTotalRevenue() {
    return this.orders.reduce((orderAcc, currOrder) => {
      const order_total = currOrder.order_items.reduce((itemAcc, currItem) => {
        itemAcc += parseFloat(currItem.product?.price || "");
        return itemAcc;
      }, 0);
      orderAcc += order_total;
      return orderAcc;
    }, 0);
  }
}
