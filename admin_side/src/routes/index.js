//Layouts
import { HeaderOnlyLayout } from '~/layout';

import Login from '~/pages/LoginPage/Login';
import staffManager from '~/pages/StaffPage/Staff/staffManager';
import adminStaff from '~/pages/AdminPage/Administrator/Staff/Staff';
import User from '~/pages/AdminPage/Administrator/User/User';
import Shipper from '~/pages/AdminPage/Administrator/Shipper/Shipper';
import Partner from '~/pages/AdminPage/Partner/Partner';


const PUBLIC_ROUTES = [
    {
        path: '/', component: Login, layout: null
    },
    {
        path: '/admin/staffManager', component: staffManager,
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