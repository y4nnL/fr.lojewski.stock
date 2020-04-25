import Product from '../Product/Product.vue';
import {
  PRODUCT_GETTER_FILTERED_LIST,
  PRODUCT_DISPATCH_INCREMENT,
  PRODUCT_DISPATCH_DECREMENT,
  PRODUCT_DISPATCH_QUANTITY,
  PRODUCT_DISPATCH_FETCH_LIST,
  PRODUCT_DISPATCH_RESET_FILTERS,
  PRODUCT_GETTER_FILTERS, PRODUCT_NS, PRODUCT_SHOW_FILTERS
} from 'src/store/product/constants';
import { QSpinnerGears } from 'quasar';
import { mapState } from 'vuex';

export default {
  name: 'ProductList',
  data() {
    return {
      productNs: PRODUCT_NS,
      fetching: true
    };
  },
  components: {
    Product
  },
  created() {
    this.$q.loading.show({
      spinner: QSpinnerGears
    });
    this.refresh(() => {
      this.fetching = false;
      setTimeout(() => this.$q.loading.hide(), 500);
    });
  },
  computed: {
    filteredProducts() {
      return this.$store.getters[PRODUCT_GETTER_FILTERED_LIST];
    },
    hasFilters() {
      return !!this.$store.getters[PRODUCT_GETTER_FILTERS].length;
    }
  },
  methods: {
    refresh(done) {
      this.$store.dispatch(PRODUCT_DISPATCH_FETCH_LIST)
        .finally(done);
    },
    increment(product, { unitIndex }) {
      this.$store.dispatch(PRODUCT_DISPATCH_INCREMENT, {
        productId: product.id,
        unitIndex
      });
    },
    decrement(product, { unitIndex }) {
      this.$store.dispatch(PRODUCT_DISPATCH_DECREMENT, {
        productId: product.id,
        unitIndex
      });
    },
    quantity(product, { unitIndex, quantity }) {
      this.$store.dispatch(PRODUCT_DISPATCH_QUANTITY, {
        productId: product.id,
        unitIndex,
        quantity
      });
    },
    resetFilters() {
      this.$store.dispatch(PRODUCT_DISPATCH_RESET_FILTERS);
    }
  }
};
