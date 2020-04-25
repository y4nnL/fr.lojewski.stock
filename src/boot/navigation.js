import {
  ROUTE_NAME_AUTH,
  ROUTE_NAME_STOCK
} from 'src/router/constants';

import { PRODUCT_MUTATION_TYPE } from 'src/store/product/constants';
import { AUTH_GETTER_IS_AUTHENTICATED } from 'src/store/auth/constants';

export default ({ store, router }) => {

  /**
   * Keep { meta: { auth: true }} routes protected by the auth mechanism
   */
  router.beforeEach((to, from, next) => {
    let auth = to.matched.some(route => route.meta.auth);
    let isAuthenticated = store.getters[AUTH_GETTER_IS_AUTHENTICATED];
    auth ?
      (isAuthenticated ? next() : next({ name: ROUTE_NAME_AUTH })):
      (isAuthenticated && to.name === ROUTE_NAME_AUTH ? next({ name: ROUTE_NAME_STOCK }) : next());
  });

  /**
   * Commit the product type to the store if any stock routes is matched
   */
  router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.name === ROUTE_NAME_STOCK)) {
      store.commit(PRODUCT_MUTATION_TYPE, to.params.type);
    }
    next();
  });

}
