import Settings from '../Settings/Settings.vue';
import Filters from '../Filters/Filters.vue';
import { mapState } from 'vuex';
import {
  PRODUCT_DISPATCH_TOGGLE_FILTERS,
  PRODUCT_GETTER_FILTERS, PRODUCT_NS, PRODUCT_SHOW_FILTERS,
  PRODUCT_TYPES
} from 'src/store/product/constants';
import {
  AUTH_NS, AUTH_USER,
  AUTH_DISPATCH_LOGOUT
} from 'src/store/auth/constants';
import { ROUTE_NAME_AUTH } from 'src/router/constants';

const tabs = {
  [PRODUCT_TYPES.ALL]: 'Tous',
  [PRODUCT_TYPES.FRUIT]: 'Fruits & Légumes',
  [PRODUCT_TYPES.PROTEIN]: 'Protéines',
  [PRODUCT_TYPES.CARBOHYDRATE]: 'Féculents',
  [PRODUCT_TYPES.FRESH]: 'Frais',
  [PRODUCT_TYPES.DRINK]: 'Boissons',
  [PRODUCT_TYPES.OTHER]: 'Autres'
};

export default {
  name: 'Stock',
  components: {
    Settings,
    Filters
  },
  data() {
    return {
      filtersHeight: 0,
      account: false,
      filters: false,
      settings: false,
      disconnecting: false,
      productNs: PRODUCT_NS,
      tabs
    };
  },
  computed: {
    ...mapState(AUTH_NS, {
      [AUTH_USER]: (state) => state.user
    }),
    ...mapState(PRODUCT_NS, [
      PRODUCT_SHOW_FILTERS
    ]),
    filtersCount() {
      return this.$store.getters[PRODUCT_GETTER_FILTERS].length;
    }
  },
  methods: {
    toggleFilters() {
      this.$store.dispatch(PRODUCT_DISPATCH_TOGGLE_FILTERS);
    },
    logout() {
      this.disconnecting = true;
      setTimeout(() => {
        this.$store.dispatch(AUTH_DISPATCH_LOGOUT)
          .then(() => this.$router.push({ name: ROUTE_NAME_AUTH }))
          .finally(() => this.disconnecting = false);
      }, 750);
    }
  }
};
