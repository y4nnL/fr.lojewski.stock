import { mapState } from 'vuex';
import { PRODUCT_LIST, PRODUCT_NS } from 'src/store/product/constants';

export default {
  name: 'SSettings',
  data() {
    return {
      add: false,
      right: false
    }
  },
  computed: {
    ...mapState(PRODUCT_NS, {
      [PRODUCT_LIST]: (state) => state.list
    })
  }
}
