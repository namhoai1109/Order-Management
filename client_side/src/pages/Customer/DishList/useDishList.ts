import { useGetDishes } from '@/services/Customer/services';
import { useParams } from '@umijs/max';
import { useState } from 'react';

const FIRST_ITEM = 0;

const useDishList = () => {
  const params = useParams();
  const { data, isLoading } = useGetDishes(params.id as string);
  const brandName = data?.result[FIRST_ITEM]?.partner?.brandName || '';
  const [selectValue, setSelectValue] = useState<number>(-1);
  const branches = data?.result[FIRST_ITEM]?.partner?.branches || [];

  const [orderDetail, setOrderDetail] = useState<TOrderDetail[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [dishInfoModal, setDishInfoModal] = useState<OBJECT_TYPE.TDish>();

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const addOrderDetail = (orderDetailParams: TOrderDetail) => {
    setOrderDetail([...orderDetail, orderDetailParams]);
  };

  const removeOrderDetail = (key: number) => {
    const newOrderDetail = [...orderDetail];
    const index = newOrderDetail.findIndex((item) => item.key === key);
    if (index !== -1) {
      newOrderDetail.splice(index, 1);
    }
    setOrderDetail(newOrderDetail);
  };

  const handleSelectChange = (value: number) => {
    setSelectValue(value);
  };

  const clearOrderDetail = () => {
    setOrderDetail([]);
  };

  return {
    dishes: data?.result,
    dishInfoModal,
    setDishInfoModal,
    isLoading,
    openModal,
    orderDetail,
    addOrderDetail,
    removeOrderDetail,
    brandName,
    handleOpenModal,
    branches,
    selectValue,
    handleSelectChange,
    clearOrderDetail,
  };
};

export default useDishList;
