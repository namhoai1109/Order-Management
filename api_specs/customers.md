1. Register customer

```
    [POST] /api/customers/register
    body: {
        name: string,
        address: string,
        phone: string,
        email: string,
        username: string,
        password: string
    }
    response: {
        result: string //link for email confirmation,
        meta: {
            error: string,
            message: string,
            statusCode: int
        }

    }
```

2. View customer profile

```
    [GET] /api/customers/profile
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: {
            id: int,
            accountId: int,
            email: string,
            name: string,
            phone: string,
            address: string
        },
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

3. Get partners

```
    [GET] /api/customers/partners
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: [
            {
                id: int,
                brandName: string,
                culinaryStyle: string,
                status: string,
                branches: [
                    {
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
                ],
                account: {
                    id: int,
                    email: string,
                    phone: string
                }
            }
        ]
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

4. Get dishes of partner

```
    [GET] /api/customers/partner/dishes/:partnerId
    params: {
        partnerId: int
    },
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: [
            {
                id: int,
                name: string,
                description: string,
                status: string,
                rating: int,
                partner: {
                    id: int,
                    brandName: string,
                    branches: [
                        {
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
                    ]   
                },
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
        ]
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

5. Create order

```
    [POST] /api/customers/order
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    body: {
        branchId: int,
        orderDetails: [
            {
                dishDetailId: int,
                quantity: int
            }
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