1. Register staff

```
    [POST] /api/admin/register-staff
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    body: {
        username: string,
        password: string,
        email: string,
        phone: string,
        name: string
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

2. Delete staff

```
    [DELETE] /api/admin/delete-staff/:id
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    params: {
        id: string (id of staff's account to delete)
    },
    esponse: {
        result: null
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```