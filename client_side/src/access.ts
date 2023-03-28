import { roles } from './constants/roles';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: any) {
  const { role } = initialState;
  const isPartner = role === roles.PARTNER;
  const isShipper = role === roles.SHIPPER;
  const isCustomer = role === roles.CUSTOMER;
  return {
    isPartner,
    isRoutePartner: () => isPartner,
    isShipper,
    isRouteShipper: () => isShipper,
    isCustomer,
    isRouteCustomer: () => isCustomer,
  };
}
