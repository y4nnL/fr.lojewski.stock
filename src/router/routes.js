import * as constants from './constants';
import Auth from 'src/components/Auth/Auth.vue';
import ProductList from 'src/components/ProductList/ProductList.vue';
import Settings from 'src/components/Settings/Settings.vue';
import Stock from 'src/components/Stock/Stock.vue';

function settingsRoute(path) {
  return [ {
    component: Settings,
    meta: { [constants.ROUTER_META_AUTH]: true },
    name: constants.ROUTER_NAME_SETTINGS,
    path: (path || '') + constants.ROUTER_PATH_SETTINGS,
  } ];
}

const routes = [
  {
    component: Auth,
    name: constants.ROUTER_NAME_AUTH,
    path: constants.ROUTER_PATH_AUTH,
  },
  {
    children: [
      {
        children: [ ...settingsRoute(constants.ROUTER_PATH_STOCK_TYPE) ],
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
