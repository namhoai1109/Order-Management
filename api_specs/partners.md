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