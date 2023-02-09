import { Order as OrderType, OrderItem, Product } from "./types";
import { Orders } from "./Orders";
import { extractDataFromCSV, formatOrderData } from "./common/logic";

export const extractAndFormatData = async () => {
  // Your app should read all data from the given CSV files into a meaningful data structure/s.
  const [extractedOrders, extractedOrderItems, extractedProducts] =
    await Promise.all([
      extractDataFromCSV<OrderType>("orders"),
      extractDataFromCSV<OrderItem>("order_item"),
      extractDataFromCSV<Product>("products"),
    ]);

  return formatOrderData(
    extractedOrders,
    extractedOrderItems,
    extractedProducts
  );
};

export const printAllOrders = (orders: Orders) => {
  // Print out all orders (we want order_id & order total)
  const allOrders = orders.getOrderData();
  console.log("All orders: ", allOrders);
  return allOrders;
};

export const printOrderById = (orders: Orders) => {
  // Find an order by its `order_orders.getById("12314324")id`.
  const orderById = orders.getById("12314324");
  console.log("Order by ID: ", orderById);
  return orderById;
};

export const printOrderByEmail = (orders: Orders) => {
  // Find all orders by their `customer_email`’
  const orderByEmail = orders.getByEmail("useremail1@example.com");
  console.log("Order by Email: ", orderByEmail);
  return orderByEmail;
};

export const printOrdersSorted = (orders: Orders) => {
  // Print out all orders and items sorted by `order_id`
  const allOrdersSorted = orders.getOrders();
  console.log("All orders ordered: ", allOrdersSorted);
  return allOrdersSorted;
};

export const printTotalRevenue = (orders: Orders) => {
  // Print out total revenue (Sum of all order totals)
  const totalRevenue = orders.getTotalRevenue();
  console.log("Total Revenue: ", totalRevenue);
  return totalRevenue;
};

export const myApp = async () => {
  console.log("Hello ITS world!");

  const formattedOrderData = await extractAndFormatData();

  const orders = new Orders();

  orders.newOrders(formattedOrderData);

  printAllOrders(orders);
  printOrderById(orders);
  printOrderByEmail(orders);
  printOrdersSorted(orders);
  printTotalRevenue(orders);
};

myApp();
