declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const HOST_NAME: string;

declare namespace OBJECT_TYPE {
  type TDish = {
    id: number;
    status: string;
    name: string;
    description: string;
    dishDetails: TDishDetails[];
    images: TImageDish[];
    partner?: TPartner;
  };

  type TDishDetails = {
    id: number;
    name: string;
    price: number;
  };

  type TImageDish = {
    id: number;
    filename: string;
  };

  type TDistrict = {
    value: int;
    label: string;
  };

  type TProvince = {
    value: int;
    label: string;
    districts: TDistrict[];
  };

  type TBranch = {
    districtId: int;
    address: string;
  };

  type TOrder = {
    id: number;
    orderCode: string;
    createdAt: string;
    deliveredAt: string;
    status: string;
    process: string;
    orderPrice: number;
    shippingPrice: number;
    totalPrice: number;
    shipper: TShipper | null;
    customer: TCustomer;
    orderDetails: TOrderDetail[];
    branch: TBranchOrder;
  };

  type TOrderDetail = {
    id: number;
    dishId: number;
    dishDetailId: number;
    dishName: string;
    dishDetailName: string;
    quantity: number;
    totalPrice: number;
  };

  type TBranchObj = {
    id: number;
    address: string;
    district: {
      id: number;
      name: string;
    };
  };

  interface TBranchOrder extends TBranchObj {
    partner: {
      id: number;
      brandName: string;
    };
  }

  type TPartner = {
    id: number;
    brandName: string;
    culinaryStyle: string;
    branches: TBranchObj[];
  };

  type TShipper = {
    id: number;
    name: string;
    address: string;
    licensePlate: string;
    account: {
      id: number;
      phone: string;
      email: string;
      nationalId: string;
    };
  };

  type TCustomer = {
    id: number;
    name: string;
    address: string;
    account: {
      id: number;
      phone: string;
    };
  };
}

type TAuth = {
  children: React.ReactNode;
  role: string;
};

type TMeta = {
  error: string;
  message: string;
  statusCode: number;
};

type TTemplateResponse<T> = {
  result: T;
  meta: TMeta;
};

type TObjectHasFlexibleKey = {
  [x: string]: string;
};

type TCallbackVoid = () => void;
