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