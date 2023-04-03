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
            { name: string, price: float}
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
