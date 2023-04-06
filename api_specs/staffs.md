1. Get partners

```
  [GET] /api/staffs/get-partners/:taxCode
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