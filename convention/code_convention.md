# Naming convention

## Rule common:

- Đặt tên nên mô tả được phạm vi và mục đích sử dụng, không đặt tên mơ hồ.

### local variable names:

- dùng `lowerCamelCase`, tên biến là danh từ, cụm danh từ.

### constant field names:

- theo format `CONSTANT_VAR`.

### parameter names:

- khai báo theo `lowerCamelCase`.

### class names, function component:

- khai báo theo `UpperCamelCase`.

### method (function):

- khai báo theo `lowerCamelCase`. Tên hàm, method sẽ bắt đầu bằng một động từ hoặc cụm động từ dể hiểu mô tả chức năng chính của hàm.

# Local variable declaration convention

## Use `const` and `let`:

- Khi define biến có thể dùng `const` hoặc `let`, Mặc đinh sẽ sử dụng const trừ trường hợp biến được reassigned. `var` keyword không được phép sử dụng.

## Declare type as needed:

- Chú thích kiểu dữ liệu cho biến trong trường hợp sử dụng project sử dụng JS.
- Sử dụng JSDoc type annotations để chú thích ở trước hoặc sau biến cần khai báo.
- Trong trường hợp cần mô tả ngắn đặt phần chú thích lên phía tren biến cần khai bào.

```
	const /** !Array<number> */ data = [];
	const data = [];/** !Array<number> */

	/**
	 * Some description.
	 * @type {!Array<number>}
	 */
	const data = [];
```

## Declare type (Typescript):

- Bắt đầu bằng keywork `Type` và được viết theo `CamelCase`.

```
	const TypeUser = {
	    name: string,
	    age: number
	}

	const user: TypeUser = {
	    name: "John",
	    age: 23
	}
```

## Declare interface (TypeScript):

- Bằng đầu bằng letter `I` và được viết theo `CamelCase`.

```
	const interface IUser = {
	    name: string,
	    age: number
	}

	const user: IUser = {
	    name: "John",
	    age: 23
	}
```

# Magic number:

- Luôn phải comment cho magic number, để có thể biệt được tại sao dùng con số đó.

```
	  // 16 is the padding left
	  left: scrollDistance + 16,
	  top: 0, //px
	  behavior: "smooth",
```
