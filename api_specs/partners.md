1. Register

```
    [POST] /api/partners/register
    body: {
        brandName: string,
        email: string,
        phone: string,
        bankAccount: string,
        representative: string,
        culinaryStyle: string,
        username: string,
        password: string,
        taxCode: string
        branches: [
            {
                districtId: int,
                address: string
            },
            ...
        ]
    },
    response: {
        result: string //link for email confirmation
        meta: {
            "error": string,
            "message": string,
            statusCode: int
        }
    }

```

2. Add dish

```
    [POST] /api/partners/add-dish
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    body: //form-data {
        image: file,
        name: string,
        dishDetails: [  //JSON string
            { name: string, price: float, quantity: int }
        ]
    },
    response: {
        result: null,
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

3. Get all dishes

```
    [GET] /api/partners/get-dishes
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: [
            {
                id: int,
                partnerId: int,
                name: string,
                description: string,
                status: string,
                rating: string,
                dishDetails: [
                    {
                        id: int,
                        dishId: int,
                        name: string,
                        price: float
                    }
                ],
                images: [
                    {
                        id: int,
                        dishId: int,
                        filename: string
                    }
                ]
            }
        ],
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }

```

4. Get all orders

```
    [GET] /api/partners/orders
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: [
            {
                id: int,
                orderCode: string,
                createdAt: string,
                deliveredAt: string,
                status: string,
                process: string,
                orderPrice: float,
                shippingPrice: float,
                totalPrice: float,
                shipper: {
                    id: int,
                    name: string,
                    address: string,
                    licensePlate: string,
                    account: {
                        id: int,
                        phone: string,
                        email: string,
                        nationalId: string
                    }
                },
                customer: {
                    id: int,
                    name: string,
                    address: string,
                    account: {
                        id: int,
                        phone: string
                    }
                },
                orderDetails: [
                    {
                        id: int,
                        dishId: int,
                        dishDetailId: int,
                        dishName: string,
                        dishDetailName: string,
                        quantity: int,
                        totalPrice: float
                    }     
                ],
                branch: {
                    id: int,
                    address: string,
                    district: {
                        id: int,
                        name: string,
                        city: {
                            id: int,
                            name: string
                        }
                    }
                }

            }
        ],
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

5. Confirm order

```
    [PUT] /api/orders/confirm-order/:orderCode
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: null,
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```