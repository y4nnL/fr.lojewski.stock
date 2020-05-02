import * as productConstants from 'src/store/product/constants';
import { mapState } from 'vuex';

export default {
  name: 'Settings',
  data() {
    return {
      add: false,
      right: false,
    };
  },
  computed: {
    ...mapState(productConstants.PRODUCT_NS, {
      [productConstants.PRODUCT_KEY_LIST]: (state) => state.list,
    }),
  },
};
