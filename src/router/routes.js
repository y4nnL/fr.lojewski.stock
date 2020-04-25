import { PRODUCT_TYPES } from '../store/product/constants';
import {
  ROUTE_NAME_AUTH,
  ROUTE_NAME_STOCK
} from './constants';

import Auth from 'src/components/Auth/Auth.vue';
import Stock from 'src/components/Stock/Stock.vue';
import ProductList from 'src/components/ProductList/ProductList.vue';

const routes = [
  {
    path: '/auth',
    name: ROUTE_NAME_AUTH,
    component: Auth
  },
  {
    path: '/stock',
    name: ROUTE_NAME_STOCK,
    redirect: '/stock/all',
    meta: { auth: true },
    component: Stock,
    children: [
      {
        path: `/stock/:type(${Object.values(PRODUCT_TYPES).join('|')})`,
        meta: { auth: true },
        component: ProductList
      }
    ]
  },
  {
    path: '*',
    redirect: '/stock'
  }
];

export default routes;
