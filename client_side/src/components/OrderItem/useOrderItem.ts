import { orderProcess } from '@/constants/constants_order';
import { getKeyPartner, usePutConfirmOrder } from '@/services/Partner/services';
import {
  getKeyShipper,
  usePutConfirmDeliverOrder,
  usePutConfirmOrder as usePutConfirmOrderShipper,
} from '@/services/Shipper/services';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width };
};

const MOBILE_WIDTH = 500;

const useOrderItem = (orderCode: string) => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const { width } = useViewport();
  const isMobile = width <= MOBILE_WIDTH;

  const queryClient = useQueryClient();

  const onSuccess = () => {
    message.success('Successfully !');
    queryClient.invalidateQueries(getKeyPartner.orders);
    queryClient.invalidateQueries(getKeyShipper.ordersKey(orderProcess.PENDING));
    queryClient.invalidateQueries(getKeyShipper.ordersKey(orderProcess.ALL));
  };

  const mutationConfirmOrderPartner = usePutConfirmOrder(onSuccess);

  const handleConfirmOrder = () => {
    mutationConfirmOrderPartner.mutate(orderCode);
  };

  const mutationConfirmOrderShipper = usePutConfirmOrderShipper(onSuccess);
  const handleConfirmTakeOrder = () => {
    mutationConfirmOrderShipper.mutate({ orderCode, process: orderProcess.PENDING });
  };

  const handleConfirmDeliverOrder = () => {
    mutationConfirmOrderShipper.mutate({ orderCode, process: orderProcess.DELIVERING });
  };

  const confirmDeliverSuccess = () => {
    message.success('Order is delivered successfully !');
    queryClient.invalidateQueries(getKeyShipper.ordersKey(orderProcess.ALL));
  };
  const mutationConfirmDeliverOrder = usePutConfirmDeliverOrder(confirmDeliverSuccess);
  const handleConfirmDeliverOrderShipper = () => {
    mutationConfirmDeliverOrder.mutate(orderCode);
  };

  return {
    toggleModal,
    isLoadingPartner: mutationConfirmOrderPartner.isLoading,
    isLoadingShipper: mutationConfirmOrderShipper.isLoading,
    handleConfirmDeliverOrderShipper,
    handleToggleModal,
    handleConfirmOrder,
    handleConfirmTakeOrder,
    handleConfirmDeliverOrder,
    isMobile,
  };
};

export default useOrderItem;
