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
    [GET] /api/shippers/get-shipper/:username
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response: {
        result: [{
            id: int,
            username: string,
            password: string,
            email: string,
            phone: string,
            bankAccount: string,
            nationalId: string,
            licensePlate: string,
            role: string,
            confirmed: boolean,
            status: string
        },
        shipper:{
            districtId: int,
            orders: Order[],
            name: string,
            address: string,
            licensePlate: string
        }
        ],
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```