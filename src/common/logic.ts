import fs from "fs";
import csv from "csv-parser";
import { OrderItem, Order as OrderType, Product } from "../types";


export const extractDataFromCSV = <T>(filename: string): Promise<T[]> => {
  const extractedData: T[] = [];
  return new Promise<T[]>((res) =>
    fs
      .createReadStream(`./data/${filename}.csv`)
      .on("error", (error) => {
        console.error(error);
      })
      .pipe(csv())
      .on("data", (data: T) => {
        extractedData.push(data);
      })
      .on("end", () => {
        console.log(`Extracted data from ${filename}.csv`);
        res(extractedData);
      })
  );
};

/**
 * ER Diagram
 *
 * order {
 *  order_id int PK
 *  customer_email varchar
 * }
 *
 * product {
 *  simple_sku varchar PK
 *  name varchar
 *  price float
 *  special_price float
 *  url varchar
 * }
 *
 * order_item {
 *  order_id int PK & FK
 *  sku varchar PK & FK
 * }
 *
 */

export const formatOrderData = (
  orders: OrderType[],
  order_items: OrderItem[],
  products: Product[]
) => {
  return orders.map((order) => ({
    ...order,
    order_items: order_items
      .filter((order_item) => order_item.order_id === order.order_id)
      .map((order_item) => ({
        ...order_item,
        product: products.find(
          (product) => product.simple_sku === order_item.sku
        ),
      })),
  }));
};
