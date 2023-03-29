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
        result: string //jwt_token for email confirmation,
        meta: {
            error: string,
            message: string,
            statusCode: int
        }

    }
```

1. View customer profile

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
