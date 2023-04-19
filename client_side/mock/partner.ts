export default {
  'GET /api/partners/orders': {
    result: [
      {
        id: 1,
        orderCode: 'fjej583jfkwi34k',
        createdAt: '2021-05-01 12:00:00',
        deliveredAt: '2021-05-01 12:00:00',
        status: 'Delivered',
        process: 'Delivered',
        orderPrice: 100000,
        shippingPrice: 25000,
        totalPrice: 125000,
        customer: {
          name: 'Nguyen Van A',
          address: '123 Nguyen Van Linh, Quan 7, TP.HCM',
        },
        orderDetails: [
          {
            id: 1,
            dishId: 1,
            dishDetailId: 1,
            dishName: 'Bun bo Hue',
            dishDetailName: 'Bun bo Hue',
            quantity: 1,
            totalPrice: 100000,
          },
        ],
        branch: {
          id: 1,
          address: '123 Nguyen Van Linh, Quan 7, TP.HCM',
          district: {
            id: 1,
            name: 'Quan 7',
            city: {
              id: 1,
              name: 'TP.HCM',
            },
          },
        },
      },
    ],
    meta: {
      statusCode: 200,
      message: 'Success',
      error: '',
    },
  },
};
