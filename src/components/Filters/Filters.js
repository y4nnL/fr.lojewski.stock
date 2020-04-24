import {
  PRODUCT_MUTATION_OS,
  PRODUCT_MUTATION_ALERT,
  PRODUCT_MUTATION_TERM,
  PRODUCT_DISPATCH_RESET_FILTERS, PRODUCT_GETTER_FILTERED_LIST
} from '../../store/product/constants';
import { PRODUCT_NS } from 'src/store/product/constants';

export default {
  name: 'Filters',
  mounted() {
    window.addEventListener('deviceorientation', this.emitHeight, true);
    this.emitHeight();
  },
  destroy() {
    window.removeEventListener('deviceorientation', this.emitHeight, true);
  },
  methods: {
    reset() {
      this.$store.dispatch(PRODUCT_DISPATCH_RESET_FILTERS);
    },
    emitHeight() {
      let height = this.$refs.rootElement.style.height;
      this.$refs.rootElement.style.height = 'auto';
      this.$emit('height', this.$refs.rootElement.clientHeight);
      this.$refs.rootElement.style.height = height;
    }
  },
  props: {
    namespace: {
      type: String,
      default: PRODUCT_NS
    }
  },
  computed: {
    term: {
      get() {
        return this.$store.state.product.term;
      },
      set(value) {
        this.$store.commit(PRODUCT_MUTATION_TERM, value);
      }
    },
    alert: {
      get() {
        return this.$store.state.product.alert;
      },
      set(value) {
        this.$store.commit(PRODUCT_MUTATION_ALERT, value);
      }
    },
    os: {
      get() {
        return this.$store.state.product.os;
      },
      set(value) {
        this.$store.commit(PRODUCT_MUTATION_OS, value);
      }
    },
    isReset() {
      return this.term || this.os || this.alert;
    },
    productsLength() {
      return this.$store.getters[PRODUCT_GETTER_FILTERED_LIST].length;
    }
  }
}
