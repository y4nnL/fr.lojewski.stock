import * as authConstants from 'src/store/auth/constants';
import * as productConstants from 'src/store/product/constants';
import * as routerConstants from 'src/router/constants';
import Settings from '../Settings/Settings.vue';
import StockFilter from '../StockFilter/StockFilter.vue';
import { mapState } from 'vuex';

/**
 * Product type translation table
 * @type {Object<string>}
 */
const tabs = {
  [productConstants.PRODUCT_TYPES.ALL]: 'Tous',
  [productConstants.PRODUCT_TYPES.FRUIT]: 'Fruits & Légumes',
  [productConstants.PRODUCT_TYPES.PROTEIN]: 'Protéines',
  [productConstants.PRODUCT_TYPES.CARBOHYDRATE]: 'Féculents',
  [productConstants.PRODUCT_TYPES.SWEET]: 'Sucré',
  [productConstants.PRODUCT_TYPES.FRESH]: 'Frais',
  [productConstants.PRODUCT_TYPES.DRINK]: 'Boissons',
  [productConstants.PRODUCT_TYPES.HOUSEHOLD]: 'Droguerie',
  [productConstants.PRODUCT_TYPES.OTHER]: 'Autres',
};

export default {
  name: 'Stock',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
    Settings,
    StockFilter,
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Whether the state contains filters
       * @type {boolean}
       */
      filters: false,
      /**
       * The calculated height of the filters component
       * @type {number}
       */
      filtersHeight: 0,
      /**
       * The header's height. Useful to calculate proper filters height and container top
       * @type {number}
       */
      headerHeightHint: 98,
      /**
       * Alias of the router settings path constant
       * @type {string}
       */
      settingsPath: routerConstants.ROUTER_PATH_SETTINGS,
      /**
       * Alias of the router stock path constant
       * @type {string}
       */
      stockPath: routerConstants.ROUTER_PATH_STOCK,
      /**
       * Product type translation table
       * @type {Object<string>}
       */
      tabs,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * Number of current store state active filters
     * @returns {number}
     */
    filtersCount() {
      return this.$store.getters[productConstants.PRODUCT_GET_FILTERS].length;
    },
    /**
     * The calculated style attribute of the filters component
     * @returns {{height: string}}
     */
    filtersStyle() {
      return { height: this.showFilters ? this.filtersHeight + 'px' : '0' };
    },
    /**
     * The calculated style attribute of the page container component
     * @returns {{top: string}}
     */
    pageContainerStyle() {
      return { top: (this.showFilters ? this.headerHeightHint + this.filtersHeight : this.headerHeightHint) + 'px' };
    },
    /**
     * Whether show the FilterStock component
     * @name showFilters
     * @type {boolean}
     */
    ...mapState(productConstants.PRODUCT_NS, { showFilters: productConstants.PRODUCT_KEY_FILTER_SHOW }),
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Toggle the filters component visibility by triggering the corresponding store action
     */
    toggleFilters() {
      this.$store.dispatch(productConstants.PRODUCT_DO_TOGGLE);
    },
  },
};
