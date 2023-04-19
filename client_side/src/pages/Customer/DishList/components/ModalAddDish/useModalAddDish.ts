import { useState } from 'react';

const useModalAddDish = (
  dishId: number,
  dishName: string,
  onCancel: () => void,
  addOrderDetail: (selectedDetail: TOrderDetail) => void,
) => {
  const [selectedDetail, setSelectedDetail] = useState<TSelectedDetail[]>([]);

  const addDetail = (detail: OBJECT_TYPE.TDishDetails) => {
    const newSelectedDetail = [...selectedDetail];
    const index = newSelectedDetail.findIndex((item) => item.details.id === detail.id);
    if (index === -1) {
      newSelectedDetail.push({
        details: detail,
        quantity: 1,
      });
    } else {
      newSelectedDetail[index].quantity += 1;
    }
    setSelectedDetail(newSelectedDetail);
  };

  const deleteDetail = (deletedDetail: TSelectedDetail) => {
    const newSelectedDetail = [...selectedDetail];
    const index = newSelectedDetail.findIndex(
      (item) => item.details.id === deletedDetail.details.id,
    );
    if (index !== -1) {
      if (newSelectedDetail[index].quantity > 1) {
        newSelectedDetail[index].quantity -= 1;
      } else {
        newSelectedDetail.splice(index, 1);
      }
    }
    setSelectedDetail(newSelectedDetail);
  };

  const totalPrice = selectedDetail.reduce((acc, item) => {
    return acc + item.details.price * item.quantity;
  }, 0);

  const cancelModal = () => {
    setSelectedDetail([]);
    onCancel();
  };

  const handleAddOrderDetail = () => {
    const orderDetail: TOrderDetail = {
      details: selectedDetail,
      key: dishId,
      price: totalPrice,
      dishName,
    };
    addOrderDetail(orderDetail);
    cancelModal();
  };

  return {
    totalPrice,
    selectedDetail,
    addDetail,
    deleteDetail,
    cancelModal,
    handleAddOrderDetail,
  };
};

export default useModalAddDish;
