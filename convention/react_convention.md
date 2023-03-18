# Sử dụng Function Component cho project này !

## Component folder stucture:

```
	ComponentName
	|-index.js/tsx	//dùng để export function component
	|-ComponentName.js/tsx 	//chứa UI của component
	|-ComponentName.css/scss/module.scss/less
	|-useComponentName.js/ts //chứa logic của component
```

## Naming:

- Component file viết theo `CamelCase`.
- Hooks:
  - Specific hooks: Tên file theo convention `use[ComponentName]` chứa logic của 1 specific component -> ko được **reuse**
  - Custom hooks: Tên file theo convention `use[Something]`.

## Use `Fragment`:

- Không dùng `<div></div>` như 1 wrapper -> dùng `<Fragment></Fragment>`

```
	// Disallowed
	<div>
	      <button>{text1}</button>
	      <button>{text2}</button>
	</div>

	// Good
	<Fragment>
	      <button>{text1}</button>
	      <button>{text2}</button>
	</Fragment>
```

## Props:

- Dùng `lowerCamelCase` để đặt tên props. Trong trường hợp props là component thì đặt tên theo `PascalCase`.

```
	<Foo
	  userName="hello"
	  phoneNumber={12345678}
	  Component={SomeComponent}
	/>
```

- Luôn phải define `default props` cho các `Optional props`.

## Keys:

- Không dùng array index để làm key vì React dùng index là key phòng trường hợp không có key attribute.

```
	// Hai array dưới là tương đồng
	countries.map((country) => <Item country={country} />);
	countries.map((country, index) => <Item country={country} key={index} />);
```

- Trong trường hợp array React elements thay đổi thứ tự (dynamic list). Lúc này ở cùng một index những là hai component khác nhau -> React sẽ phải re-created lại Component mới -> trong quá trình re-render có thể các hàm `cleanup` hoặc `componentWillUnMount` sễ chạy -> bug không đáng có.
- Không dùng random value làm key. Vì trong quá trình re-render, giá trị của key được tính toán lại và react xem component đã unmount -> generate một component mới nên các hàm `cleanup` hoặc `componentWillUnMount` sẽ được chạy sau mỗi lần re-render.
