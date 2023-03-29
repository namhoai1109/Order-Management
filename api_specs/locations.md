1. Get locations:

```
    [GET] /api/locations
    response: {
        result: [
            {
                value: int
                label: string
                districts: [
                    {
                        value: int
                        label: string
                    },
                    ...
                ]
            },
            ...
        ],
        meta: {
            "error": string,
            "message": string,
            statusCode: int
        }
    }

```
