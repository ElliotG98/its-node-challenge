import * as ordersApp from '../myApp';

describe('Test someComplexFunction', () => {
  const logSpy = jest.spyOn(global.console, "log");
  const allOrdersSpy = jest.spyOn(ordersApp, 'printAllOrders');
  const orderByEmailSpy = jest.spyOn(ordersApp, 'printOrderByEmail');
  const orderByIdSpy = jest.spyOn(ordersApp, 'printOrderById');
  const ordersSorted = jest.spyOn(ordersApp, 'printOrdersSorted');
  const totalRevenueSpy = jest.spyOn(ordersApp, "printTotalRevenue");

  beforeAll(async () => {
    await ordersApp.myApp();
  })

  test('Console log should have been called', async () => {
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Hello ITS world!');
  });

  test('All orders were returned in the correct format', () => {
    expect(allOrdersSpy).toBeCalled()
    expect(allOrdersSpy.mock.results[0].value[0]).toMatchObject({
      order_id: expect.any(String),
      order_total: expect.any(Number)
    })
  })

  test("Get Order by Email", () => {
    expect(orderByEmailSpy).toBeCalled();
    expect(orderByEmailSpy.mock.results[0].value).toMatchObject({
      order_id: expect.any(String),
      customer_email: expect.any(String),
      order_items: expect.any(Array)
    });
  });

  test("Get Order by id", () => {
    expect(orderByIdSpy).toBeCalled();
    expect(orderByIdSpy.mock.results[0].value).toMatchObject({
      order_id: expect.any(String),
      customer_email: expect.any(String),
      order_items: expect.any(Array),
    });
  });
});
