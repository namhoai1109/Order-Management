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
    response: {
        result: null
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

3. Update status Account
```
    [POST] /api/admin/update-accountStatus/:id
    header: {
        authorization: string //"Bearer " + jwt_token
    },
    params: {
        id: string (id of account to delete)
    },
    response: {
        result: null
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }

```


4. Get Staff

```
    [GET] /api/admin/get-staff/:id
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: {
            username: string,
            password: string,
            email: string,
            phone: string,
            name: string
        },
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```


5. Get All Staff

```
    [GET] /api/admin/get-allStaff
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: {
            id: int,
            username: string,
            password: string,
            email: string,
            phone: string,
            bankAccount: string,
            nationalId: string,
            licensePlate: string,
            role: "staff",
            confirmed: boolean,
            status: string

            
        },
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```