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

3. Update Status Account
```
    [POST] /api/admin/update-account-status/:id
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
    [GET] /api/admin/get-staffs
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

6. Get All Account

```
    [GET] /api/admin/get-all-account
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
            role: string,
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

7. Get shippers

```
    [GET] /api/admin/get-shippers
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response:{ 
       result: [
            id: int,
            name: string,
            address: string,
            licensePlate: string,
            account: {
                id: int,
                email: string,
                phone: string,
                bankAccount: string,
                nationalId: string
            },
            district: {
                id: int,
                name: string,
                city: {
                    id: int,
                    name: string
                }
            }
        ],
        meta: {
            error: string,
            message: string,
            statusCode: int

```

8. Get partners

```
  [GET] /api/admin/partners
  headers: {
        authorization: string //Bearer  + jwt_token
  },
  response: {
    result: [
      {
        id: int,
        accountId: int,
        contractId: int,
        brandName: string,
        taxCode: string,
        representative: string,
        orderQuantity: int,
        status: string,
        culinaryStyle: string,
        account: {
          id: int,
          email: string,
          bankAccount: string,
          nationalId: string,
          isConfirmed: boolean
        },
        contract: {
          id: int,
          createdAt: string,
          confirmedAt: string,
          expiredAt: string,
          isConfirmed: boolean,
          isExpired: boolean,
          taxCode: string,
          representative: string,
          bankAccount: string,
          branchQuantity: int,
          commission: float,
          effectTimeInYear: int
        }
      }
    ],
    meta: {
      error: string,
      message: string,
      statusCode: int
    }
  }
  
```

9. Get All Active Shipper

```
    [GET] /api/admin/get-active-shippers
    headers: {
        authorization: string //"Bearer " + jwt_token
    },
    response:{ 
       result: [
            id: int,
            name: string,
            address: string,
            licensePlate: string,
            account: {
                id: int,
                email: string,
                phone: string,
                bankAccount: string,
                nationalId: string
            },
            district: {
                id: int,
                name: string,
                city: {
                    id: int,
                    name: string
                }
            }
        ],
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```