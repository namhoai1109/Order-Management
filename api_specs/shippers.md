1. Register

```
    [POST] /api/shippers/register
    body: {
        "username": string,
        "password": string,
        "email": string,
        "name": string,
        "phone": string,
        "address": string,
        "nationalId": string,
        "licensePlate": string,
        "bankAccount": string,
        "districtId": int
    },
    esponse: {
        result: string //link for email confirmation,
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

2. Get Shipper Profile

```
    [GET] /api/shippers/profile
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: {
            id: int,
            accountId: int,
            districtId: int,
            name: string,
            address: string,
            licensePlate: string,
            district: {
                id: int,
                name: string,
                city: {
                    id: int,
                    name: string
                }
            },
            account: {
                id: int,
                username: string,
                email: string,
                phone: string,
                nationalId: string,
                bankAccount: string
            }
        },
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

3. View orders

```
    [GET] /api/shippers/orders
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: [
            {
                id: int,
                orderCode: string,
                customer: {
                    id: int,
                    name: string,
                    address: string
                },
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
                },
                status: string //confirmed
                orderPrice: float,
                orderDetails: [
                    {
                        id: int,
                        orderId: int,
                        dishName: string,
                        dishDetailName: string,
                        quantity: int,
                        totalPrice: float
                    }
                ]
            }
        ]
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

4. Confirm take order

```
    [PUT] /api/shippers/order/:orderCode
    params: {
        orderCode: string
    },
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    body: {
        process: string //taking, taken, delivering, delivered
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