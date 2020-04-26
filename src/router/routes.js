import * as constants from './constants';
import Auth from 'src/components/Auth/Auth.vue';
import Stock from 'src/components/Stock/Stock.vue';
import ProductList from 'src/components/ProductList/ProductList.vue';

const routes = [
  {
    path: constants.ROUTER_PATH_AUTH,
    name: constants.ROUTER_NAME_AUTH,
    component: Auth
  },
  {
    path: constants.ROUTER_PATH_STOCK,
    name: constants.ROUTER_NAME_STOCK,
    redirect: constants.ROUTER_PATH_STOCK_ALL,
    meta: { [constants.ROUTER_META_AUTH]: true },
    component: Stock,
    children: [
      {
        path: constants.ROUTER_PATH_STOCK_TYPE,
        meta: { [constants.ROUTER_META_AUTH]: true },
        component: ProductList
      }
    ]
  },
  {
    path: '*',
    redirect: constants.ROUTER_PATH_STOCK
  }
];

export default routes;
