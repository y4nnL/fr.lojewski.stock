import * as authConstants from 'src/store/auth/constants';
import * as productConstants from 'src/store/product/constants';
import * as routerConstants from 'src/router/constants';
import * as vuexHelpers from 'vuex';
import Settings from '../Settings/Settings.vue';
import StockFilter from '../StockFilter/StockFilter.vue';

/**
 * Product type translation table
 * @type {Object<string>}
 */
const tabs = {
  [productConstants.PRODUCT_TYPES.ALL]: 'Tous',
  [productConstants.PRODUCT_TYPES.FRUIT]: 'Fruits & Légumes',
  [productConstants.PRODUCT_TYPES.PROTEIN]: 'Protéines',
  [productConstants.PRODUCT_TYPES.CARBOHYDRATE]: 'Féculents',
  [productConstants.PRODUCT_TYPES.FRESH]: 'Frais',
  [productConstants.PRODUCT_TYPES.DRINK]: 'Boissons',
  [productConstants.PRODUCT_TYPES.OTHER]: 'Autres'
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
       * Disconnect button loading state
       * @type {boolean}
       */
      disconnecting: false,
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
       * Whether show the setting backdrop
       * @type {boolean}
       */
      settings: false,
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
     * The user's email
     * @name email
     */
    ...vuexHelpers.mapState(authConstants.AUTH_NS, {
      email: authConstants.AUTH_KEY_EMAIL,
    }),
    /**
     * Whether show the FilterStock component
     * @name showFilters
     */
    ...vuexHelpers.mapState(productConstants.PRODUCT_NS, {
      showFilters: productConstants.PRODUCT_SHOW_FILTERS
    }),
    /**
     * Number of current store state active filters
     * @returns {number}
     */
    filtersCount() {
      return this.$store.getters[productConstants.PRODUCT_GETTER_FILTERS].length;
    },
    /**
     * The calculated style attribute of the filters component
     * @returns {{height: string}}
     */
    filtersStyle() {
      return {
        height: this.showFilters ? this.filtersHeight + 'px' : '0',
      };
    },
    /**
     * The calculated style attribute of the page container component
     * @returns {{top: string}}
     */
    pageContainerStyle() {
      return {
        top: (this.showFilters ? this.headerHeightHint + this.filtersHeight: this.headerHeightHint) + 'px',
      };
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Toggle the filters component visibility by triggering the corresponding store action
     */
    toggleFilters() {
      this.$store.dispatch(productConstants.PRODUCT_DISPATCH_TOGGLE_FILTERS);
    },
    /**
     * Trigger the logout store action
     */
    logout() {
      this.disconnecting = true;
      setTimeout(() => {
        this.$store.dispatch(authConstants.AUTH_ACTION_LOGOUT)
          .then(() => this.$router.push({ name:routerConstants.ROUTE_NAME_AUTH }))
          .finally(() => this.disconnecting = false);
      }, 750);
    },
  },
};
