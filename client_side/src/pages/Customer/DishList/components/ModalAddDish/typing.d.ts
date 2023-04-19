type TSelectedDetail = {
  details: OBJECT_TYPE.TDishDetails;
  quantity: number;
};

type TOrderDetail = {
  details: TSelectedDetail[];
  key: number;
  price: number;
  dishName: string;
};
