import * as productConstants from 'src/store/product/constants';

export default {
  name: 'StockFilter',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    let _emitHeight = () => this.emitHeight();
    return {
      /**
       * Alias of the emitHeight method with scope reset
       * @private
       * @type {function:void}
       */
      _emitHeight,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * V-model of the store state "alert" property
     * @return {boolean}
     */
    alert: {
      get() { return this.$store.state.product.alert; },
      set(value) { this.$store.commit(productConstants.PRODUCT_MUTATION_ALERT, value); },
    },
    /**
     * V-model of the store state "os" property
     * @return {boolean}
     */
    os: {
      get() { return this.$store.state.product.os; },
      set(value) { this.$store.commit(productConstants.PRODUCT_MUTATION_OS, value); },
    },
    /**
     * V-model of the store state "term" property
     * @return {string}
     */
    term: {
      get() { return this.$store.state.product.term; },
      set(value) { this.$store.commit(productConstants.PRODUCT_MUTATION_TERM, value); },
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  destroy() {
    window.removeEventListener('orientationchangeend', this.emitHeight);
  },
  mounted() {
    // We need to recalculate the height on mobile platforms
    if ('screen' in window) {
      window.addEventListener('orientationchangeend', this.emitHeight);
    }
    this.emitHeight();
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Emit the new calculated height
     */
    emitHeight() {
      if (this.$refs && this.$refs.rootElement) {
        let height = this.$refs.rootElement.style.height;
        this.$refs.rootElement.style.height = 'auto';
        this.$emit('height', this.$refs.rootElement.clientHeight);
        this.$refs.rootElement.style.height = height;
      }
    },
  },
}
