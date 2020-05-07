import * as routerConstants from 'src/router/constants';
import Vue from 'vue';
import { AUTH_GET_IS_AUTHENTICATED } from 'src/store/auth/constants';
import { PRODUCT_SET_FILTER_TYPE } from 'src/store/product/constants';

export default ({ store, router }) => {

  /**
   * Access to route paths into vue components
   */
  Object.keys(routerConstants).forEach(key => {
    if (/PATH/.test(key)) {
      Vue.prototype[key] = routerConstants[key];
    }
  });

  /**
   * Keep { meta: { [ROUTER_META_AUTH]: true }} routes protected by the auth mechanism
   */
  router.beforeEach((to, from, next) => {
    let auth = to.matched.some(route => route.meta[routerConstants.ROUTER_META_AUTH]);
    let isAuthenticated = store.getters[AUTH_GET_IS_AUTHENTICATED];
    if (auth) {
      isAuthenticated ? next() : next({ name: routerConstants.ROUTER_NAME_AUTH });
    } else {
      isAuthenticated && to.name === routerConstants.ROUTER_NAME_AUTH ?
        next({ name: routerConstants.ROUTER_NAME_STOCK }) :
        next();
    }
  });

  /**
   * Commit the product type to the store if any stock routes is matched
   */
  router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.name === routerConstants.ROUTER_NAME_STOCK)) {
      store.commit(PRODUCT_SET_FILTER_TYPE, to.params.type);
    }
    next();
  });

}
