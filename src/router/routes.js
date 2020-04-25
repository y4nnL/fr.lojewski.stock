import { PRODUCT_TYPES } from '../store/product/constants';
import {
  ROUTE_NAME_AUTH,
  ROUTE_NAME_PRODUCTS
} from './constants';

import AuthRoute from 'src/components/AuthRoute/AuthRoute.vue';

const routes = [
  {
    path: '/auth',
    name: ROUTE_NAME_AUTH,
    component: AuthRoute
  },
  {
    path: '/products',
    name: ROUTE_NAME_PRODUCTS,
    redirect: '/products/all',
    meta: { auth: true },
    component: () => import('layouts/Products.vue'),
    children: [
      {
        path: `/products/:type(${Object.values(PRODUCT_TYPES).join('|')})`,
        meta: { auth: true },
        component: () => import('pages/Products.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/products'
  }
];

export default routes;
