import * as constants from './constants';
import Account from 'src/components/Account/Account.vue';
import Auth from 'src/components/Auth/Auth.vue';
import ProductList from 'src/components/ProductList/ProductList.vue';
import Settings from 'src/components/Settings/Settings.vue';
import Shopping from 'src/components/Shopping/Shopping.vue';
import Stock from 'src/components/Stock/Stock.vue';

const routes = [
  {
    component: Account,
    meta: { [constants.ROUTER_META_AUTH]: true },
    name: constants.ROUTER_NAME_ACCOUNT,
    path: constants.ROUTER_PATH_ACCOUNT,
  },
  {
    component: Auth,
    name: constants.ROUTER_NAME_AUTH,
    path: constants.ROUTER_PATH_AUTH,
  },
  {
    component: Settings,
    meta: { [constants.ROUTER_META_AUTH]: true },
    name: constants.ROUTER_NAME_SETTINGS,
    path: constants.ROUTER_PATH_SETTINGS,
  },
  {
    component: Shopping,
    meta: { [constants.ROUTER_META_AUTH]: true },
    name: constants.ROUTER_NAME_SHOPPING,
    path: constants.ROUTER_PATH_SHOPPING,
  },
  {
    children: [
      {
        component: ProductList,
        meta: { [constants.ROUTER_META_AUTH]: true },
        path: constants.ROUTER_PATH_STOCK_TYPE,
      },
    ],
    component: Stock,
    meta: { [constants.ROUTER_META_AUTH]: true },
    name: constants.ROUTER_NAME_STOCK,
    path: constants.ROUTER_PATH_STOCK,
    redirect: constants.ROUTER_PATH_STOCK_ALL,
  },
  {
    path: '*',
    redirect: constants.ROUTER_PATH_STOCK,
  },
];

export default routes;
