- get locations in form sign up

```
    GET /api/locations
    response: {
        result: [
            {
                value: string, //id location
                label: string,
                district: [
                    {
                        value: string,
                        label: string
                    }
                ]
            }
        ],
        meta: {
            statusCode: number,
            message: string,
            error: string,
        }
    }
```
