import * as productConstants from 'src/store/product/constants';
import ProductUnit from '../ProductUnit/ProductUnit.vue';
import StorageImg from '../StorageImg/StorageImg.vue';

export default {
  name: 'Product',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  components: {
    ProductUnit,
    StorageImg,
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
};
