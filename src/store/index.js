import Vue from 'vue';
import Vuex from 'vuex';

import ProductModule from './product';
import AuthModule from './auth';

import { PRODUCT_NS } from './product/constants';
import { AUTH_NS } from './auth/constants';

Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    modules: {
      [PRODUCT_NS]: ProductModule,
      [AUTH_NS]: AuthModule,
    },
    strict: true
  });
}
