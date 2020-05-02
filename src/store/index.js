import AuthModule from './auth';
import ProductModule from './product';
import Vue from 'vue';
import Vuex from 'vuex';
import { AUTH_NS } from './auth/constants';
import { PRODUCT_NS } from './product/constants';

Vue.use(Vuex);

export default function () {
  return new Vuex.Store({
    modules: {
      [AUTH_NS]: AuthModule,
      [PRODUCT_NS]: ProductModule,
    },
    strict: true,
  });
}
