import OrderItem from '@/components/OrderItem/OrderItem';
import { Empty, Skeleton } from 'antd';
import useMyOrderPage from './useMyOrderPage';

function MyOrderPage() {
  const { orders, isLoading } = useMyOrderPage();

  if (isLoading) {
    return <Skeleton />;
  }

  if (!isLoading && orders.length === 0) {
    return <Empty />;
  }

  return (
    <div className="wrap-my-order-page">
      {orders.map((order) => {
        return <OrderItem key={order.id} orderInfo={order} canSelect />;
      })}
    </div>
  );
}

export default MyOrderPage;
