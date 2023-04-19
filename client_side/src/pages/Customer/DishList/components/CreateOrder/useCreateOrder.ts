import { usePostOrder } from '@/services/Customer/services';
import { message } from 'antd';

const useCreateOrder = (
  orderDetailList: TOrderDetail[],
  branchId: number,
  clearOrderDetail: TCallbackVoid,
) => {
  const renderTotal = () => {
    let total = 0;
    orderDetailList.forEach((orderDetail) => {
      total += orderDetail.price;
    });
    return total;
  };

  const onSuccess = () => {
    message.success('Order successfully !');
    clearOrderDetail();
  };

  const { mutate, isLoading } = usePostOrder(onSuccess);

  const getOrderData = () => {
    const data: TDataOrder = {
      branchId,
      orderDetails: [],
    };
    orderDetailList.forEach((orderDetail) => {
      orderDetail.details.forEach((detail) => {
        data.orderDetails.push({
          dishDetailId: detail.details.id,
          quantity: detail.quantity,
        });
      });
    });
    return data;
  };

  const handleSubmit = () => {
    if (branchId !== -1) {
      if (orderDetailList.length === 0) {
        message.error('Please choose dish !');
      } else {
        mutate(getOrderData());
      }
    }
  };

  return {
    renderTotal,
    isLoading,
    handleSubmit,
  };
};

export default useCreateOrder;
