import OrderItem from '@/components/OrderItem/OrderItem';
import { Empty, Skeleton } from 'antd';
import useOrderPage from './useOrderPage';

const OrderPage: React.FC = () => {
  const { orders, isLoading } = useOrderPage();

  if (isLoading) {
    return <Skeleton />;
  }

  if (!isLoading && orders.length === 0) {
    return <Empty />;
  }

  return (
    <div>
      {orders.map((order) => {
        return <OrderItem key={order.id} orderInfo={order} canChoose />;
      })}
    </div>
  );
};

export default OrderPage;
