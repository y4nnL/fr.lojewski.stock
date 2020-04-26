import * as productConstants from 'src/store/product/constants';
import ProductUnit from '../ProductUnit/ProductUnit.vue';

export default {
  name: 'Product',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
    ProductUnit,
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Product image placeholder as base64 data
       * @type {string}
       */
      placeholderSrc: productConstants.PRODUCT_PLACEHOLDER_IMAGE,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  props: {
    /** Product id */
    id: {
      default: '',
      required: true,
      type: String,
    },
    /** Product name */
    name: {
      default: '',
      required: true,
      type: String,
    },
    /** Product units */
    units: {
      default: () => [],
      required: true,
      type: Array,
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * Path to the product image
     * @returns {string}
     */
    imagePath() {
      return '/statics/products/' + this.id + '.jpg';
    },
  },
};
