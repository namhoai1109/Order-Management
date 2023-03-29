1. Login

```
    [POST] /api/auth/login
    body: {
        username: string,
        password: string
    },
    response: {
        result: {
            token: string,
            username: string,
            role: string
        },
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```