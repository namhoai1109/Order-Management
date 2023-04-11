1. Get partners

```
  [GET] /api/staffs/get-partners
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

2. Generate contract

```
  [POST] /api/staffs/generate-contract/:taxCode
  headers: {
        authorization: string //Bearer  + jwt_token
  },
  response: {
    result: null,
    meta: {
      "error": string,
      "message": string,
      statusCode: int
    }
  }

```

3. Get All Shipper

```
    [GET] /api/staffs/get-shippers
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
            role: "shipper",
            confirmed: boolean,
            status: string,
            accountId: int,
            districtId: int,
            name: string,
            address: string,
            licensePlate: string
        },
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```

3. Get All Active Shipper

```
    [GET] /api/staffs/get-active-shippers
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
            role: "shipper",
            confirmed: boolean,
            status: "active",
            accountId: int,
            districtId: int,
            name: string,
            address: string,
            licensePlate: string
        },
        meta: {
            error: string,
            message: string,
            statusCode: int
        }
    }
```