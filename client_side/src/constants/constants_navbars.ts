import { internalLink } from './internal_link';

export const navbarPartner: IMenu = {
  list: [
    {
      key: 'menu',
      label: 'Menu',
    },
    {
      key: 'order',
      label: 'Order',
    },
    {
      key: 'analyst',
      label: 'Analyst',
    },
  ],
  prevPath: internalLink.PARTNER,
};

export const navbarShipper: IMenu = {
  list: [
    {
      key: 'order',
      label: 'Order',
    },
    {
      key: 'my-order',
      label: 'My Order',
    },
  ],
  prevPath: internalLink.SHIPPER,
};

export const navbarCustomer: IMenu = {
  list: [
    {
      key: 'order',
      label: 'Order',
    },
    {
      key: 'my-order',
      label: 'My Order',
    },
  ],
  prevPath: internalLink.CUSTOMER,
};

export const defaultNavItem = {
  PARTNER: 'menu',
  SHIPPER: 'order',
  CUSTOMER: 'order',
};
