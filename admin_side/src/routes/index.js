//Layouts
import { HeaderOnlyLayout } from '~/layout';

import Login from '~/pages/LoginPage/Login';
import staffManager from '~/pages/StaffPage/Staff/staffManager';
import adminStaff from '~/pages/AdminPage/Staff/Staff';
import User from '~/pages/AdminPage/User/User';
import Shipper from '~/pages/AdminPage/Shipper/Shipper';
import Partner from '~/pages/AdminPage/Partner/Partner';


const PUBLIC_ROUTES = [
    {
        path: '/', component: Login, layout: null
    },
    {
        path: '/staff', component: staffManager, layout: HeaderOnlyLayout,
    },
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


const PRIVATE_ROUTES = [
    {},
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };