import BackButton from '@/components/BackButton/BackButton';
import DishCard from '@/components/DishCard/DishCard';
import { componentMode } from '@/constants/component_mode';
import dimensions from '@/constants/dimensions';
import { Col, Empty, Form, Row, Select, Skeleton } from 'antd';
import CreateOrder from './components/CreateOrder/CreateOrder';
import ModalAddDish from './components/ModalAddDish/ModalAddDish';
import './DishList.less';
import useDishList from './useDishList';

function DishList() {
  const {
    dishes,
    isLoading,
    dishInfoModal,
    setDishInfoModal,
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
  } = useDishList();

  if (isLoading) {
    return (
      <Row justify={componentMode.CENTER}>
        <Skeleton />
      </Row>
    );
  }

  if (dishes && dishes.length === 0) {
    return (
      <Row justify={componentMode.CENTER}>
        <Empty />
      </Row>
    );
  }

  const getBranchOptions = () => {
    return branches.map((branch) => {
      return {
        label: `${branch.address}, ${branch.district.name}`,
        value: branch.id,
      };
    });
  };

  const renderUI = () => {
    return (
      <Row gutter={dimensions.GUTTERS_16}>
        {dishes &&
          dishes.map((dish) => {
            return (
              <Col key={dish.id} span={dimensions.SPAN_6}>
                <div className="wrap-dish-item">
                  <DishCard {...dish} canDelete={false} />
                  <div
                    onClick={() => {
                      handleOpenModal();
                      setDishInfoModal(dish);
                    }}
                    className="add-dish-btn flex-center"
                  >
                    add to order
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>
    );
  };

  return (
    <Form autoComplete="off">
      <div className="wrap-dish-list">
        <div className="wrap-header flex-center">
          <BackButton />
          <span className="title">{brandName}</span>
          <Form.Item
            name="select"
            className="branch-select-form-item"
            rules={[{ required: true, message: 'Please select branch' }]}
          >
            <Select
              className="branch-select"
              placeholder="please choose branch near you"
              options={getBranchOptions()}
              onChange={(value) => handleSelectChange(value)}
            />
          </Form.Item>
        </div>
        <Row gutter={dimensions.GUTTERS_16}>
          <Col span={dimensions.SPAN_14}>{renderUI()}</Col>
          <Col span={dimensions.SPAN_10}>
            <CreateOrder
              branchId={selectValue}
              orderDetailList={orderDetail}
              removeOrderDetail={removeOrderDetail}
              clearOrderDetail={clearOrderDetail}
            />
          </Col>
        </Row>
      </div>
      {dishInfoModal !== undefined && (
        <ModalAddDish
          dish={dishInfoModal}
          open={openModal}
          onCancel={handleOpenModal}
          addOrderDetail={addOrderDetail}
        />
      )}
    </Form>
  );
}

export default DishList;
