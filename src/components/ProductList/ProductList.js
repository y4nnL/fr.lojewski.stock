import * as productConstants from 'src/store/product/constants';
import * as routerConstants from 'src/router/constants';
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
      /**
       * Alias of the router settings path constant
       * @type {string}
       */
      settingsPath: routerConstants.ROUTER_PATH_SETTINGS,
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
     * Whether the product list have active filters
     * @type {boolean}
     */
    hasFilters() {
      return this.$store.getters[productConstants.PRODUCT_GET_FILTERS].length > 0;
    },
    /**
     * The store product list
     * @name list
     * @type {Product[]}
     */
    ...mapGetters(productConstants.PRODUCT_NS, [ productConstants.PRODUCT_KEY_LIST ]),
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Dispatch the decrement production unit action
     * @param {string} productId
     * @param {string} productUnitId
     */
    decrement(productId, { productUnitId }) {
      this.$store.dispatch(productConstants.PRODUCT_DO_DECREMENT, { productId, productUnitId });
    },
    /**
     * Dispatch the increment production unit action
     * @param {string} productId
     * @param {string} productUnitId
     */
    increment(productId, { productUnitId }) {
      this.$store.dispatch(productConstants.PRODUCT_DO_INCREMENT, { productId, productUnitId });
    },
    /**
     * Dispatch the quantity production unit action
     * @param {string} productId
     * @param {string} productUnitId
     * @param {number} productUnitQuantity
     */
    quantity(productId, { productUnitId, productUnitQuantity }) {
      this.$store.dispatch(productConstants.PRODUCT_DO_QUANTITY, { productId, productUnitId, productUnitQuantity });
    },
    /**
     * Do fetch the product list
     */
    refresh(done) {
      this.$store.dispatch(productConstants.PRODUCT_DO_FETCH)
        .finally(done);
    },
    /**
     * Rest all the product filters
     */
    resetFilters() {
      this.$store.dispatch(productConstants.PRODUCT_DO_RESET);
    },
  },
};
