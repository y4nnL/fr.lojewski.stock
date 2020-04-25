import {
  ROUTE_NAME_AUTH,
  ROUTE_NAME_STOCK
} from 'src/router/constants';

import { PRODUCT_MUTATION_TYPE } from 'src/store/product/constants';
import { AUTH_GETTER_IS_AUTHENTICATED } from 'src/store/auth/constants';

export default ({ store, router }) => {

  router.beforeEach((to, from, next) => {
    let auth = to.matched.some(route => route.meta.auth);
    if (auth) {
      let isAuthenticated = store.getters[AUTH_GETTER_IS_AUTHENTICATED];
      if (isAuthenticated && to.name === ROUTE_NAME_AUTH) {
        next({ name: ROUTE_NAME_STOCK });
      } else {
        isAuthenticated ? next() : next({ name: ROUTE_NAME_AUTH });
      }
    } else {
      next();
    }
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.name === ROUTE_NAME_STOCK)) {
      store.commit(PRODUCT_MUTATION_TYPE, to.params.type);
    }
    next();
  });

}
