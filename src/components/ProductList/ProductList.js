import * as productConstants from 'src/store/product/constants';
import Product from '../Product/Product.vue';
import { QSpinnerGears } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductList',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
    Product,
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Whether the store is fetching the product list
       * @type {boolean}
       */
      fetching: true,
      /**
       * We need to know the container element scrollTop in order to calculate the QPullToRefresh disability
       * @type {Element}
       */
      ptrContainer: null,
      /**
       * Whether QPullToRefresh component is disabled
       * @type {boolean}
       */
      ptrDisability: false,
      /**
       * Check the QPullToRefresh disability at each interval
       * @type {number}
       */
      ptrInterval: 0,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Put the UI in loading state while fetching product list
   */
  created() {
    this.$q.loading.show({
      spinner: QSpinnerGears,
    });
    this.refresh(() => {
      this.fetching = false;
      setTimeout(() => this.$q.loading.hide(), 500);
    });
  },
  destroy() {
    window.clearInterval(this.ptrInterval);
  },
  /**
   * QPullToRefresh breaks vertical scroll on parent fixed container
   * https://github.com/quasarframework/quasar/issues/3644
   */
  mounted() {
    let parent = this.$el;
    do {
      parent = parent.parentNode;
    } while (!parent.classList.contains('fix-qpulltorefresh'));
    this.ptrContainer = parent;
    this.ptrInterval = setInterval(() => this.ptrDisability = this.ptrContainer.scrollTop > 0, 200);
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * The store filtered product list
     * @name filteredList
     * @type {Array}
     */
    ...mapGetters(productConstants.PRODUCT_NS, [ productConstants.PRODUCT_FILTERED_LIST ]),
    /**
     * Whether the product list have active filters
     * @type {boolean}
     */
    hasFilters() {
      return !!this.$store.getters[productConstants.PRODUCT_GETTER_FILTERS].length;
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Dispatch the decrement production unit action
     * @param {object} product
     * @param {number} unitIndex
     */
    decrement(product, { unitIndex }) {
      this.$store.dispatch(productConstants.PRODUCT_DISPATCH_DECREMENT, {
        productId: product.id,
        unitIndex,
      });
    },
    /**
     * Dispatch the increment production unit action
     * @param {object} product
     * @param {number} unitIndex
     */
    increment(product, { unitIndex }) {
      this.$store.dispatch(productConstants.PRODUCT_DISPATCH_INCREMENT, {
        productId: product.id,
        unitIndex,
      });
    },
    /**
     * Dispatch the quantity production unit action
     * @param {object} product
     * @param {number} unitIndex
     * @param {number} quantity
     */
    quantity(product, { unitIndex, quantity }) {
      this.$store.dispatch(productConstants.PRODUCT_DISPATCH_QUANTITY, {
        productId: product.id,
        unitIndex,
        quantity,
      });
    },
    /**
     * Do fetch the product list
     */
    refresh(done) {
      this.$store.dispatch(productConstants.PRODUCT_DISPATCH_FETCH_LIST)
        .finally(done);
    },
    /**
     * Rest all the product filters
     */
    resetFilters() {
      this.$store.dispatch(productConstants.PRODUCT_DISPATCH_RESET_FILTERS);
    },
  },
};
