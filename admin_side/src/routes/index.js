//Layouts
import { HeaderOnlyLayout } from '~/layout';

import Login from '~/pages/LoginPage/Login';
import StaffManager from '~/pages/StaffPage/Contract';
import adminStaff from '~/pages/AdminPage/Staff/Staff';
import User from '~/pages/AdminPage/Customer/Customer';
import Shipper from '~/pages/AdminPage/Shipper/Shipper';
import Partner from '~/pages/AdminPage/Partner/Partner';

const PUBLIC_ROUTES = [
    {
        path: '/', component: Login, layout: null
    },
];


const PRIVATE_ROUTES_STAFF = [
    {
        path: '/staff', component: StaffManager, layout: HeaderOnlyLayout,
    },
    
];

const PRIVATE_ROUTES_ADMIN = [

    {
        path: '/admin', component: adminStaff,
    },
    {
        path: '/admin/adminStaff', component: adminStaff,
    },
    {
        path: '/admin/adminUser', component: User,
    },
    {
        path: '/admin/adminShipper', component: Shipper,
    },
    {
        path: '/admin/adminPartner', component: Partner,
    },
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES_STAFF, PRIVATE_ROUTES_ADMIN };

