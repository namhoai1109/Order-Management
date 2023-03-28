### folder structure

- filename: `module_name.md`, `feature_name.md`
- each file contains api specs related to `module_name`, `feature_name`

### api standard

- RESTful standard

### `api response` structure

```
	{
		result: {
			fieldName: type
		},
		meta: {
			statusCode: number,
			message: string,
			error: string,

		}
	}
```

### `api specs` structure

- define the hostname at the top of the file or common file
- token is always added -> no have to define in api specs

```
    [method]: [api_path]
    params: {
        fieldName: type,
    }
    body: {
        fieldName: type,
    }
    response: [api_response]
```

example:

```
    POST: /partner/dish/
    body: {
        name: string,
        price: double,
        ...
    }
    response: {
        result: {
            listDish: [
                {
                    name: string,
                    price: double,
                    ...
                }
            ],
        },
        meta: {
            statusCode: number,
            message: string,
            error: string,
        }
    }
```
