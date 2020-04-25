export default {
  name: 'ProductUnit',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  props: {
    /**
     * Product unit alert threshold
     */
    alert: {
      default: 0,
      required: true,
      type: Number,
    },
    /**
     * Product unit control type
     */
    control: {
      default: 'number',
      required: true,
      type: String,
    },
    /**
     * Product unit increment step
     */
    increment: {
      default: 1,
      required: true,
      type: Number,
    },
    /**
     * Product unit many label
     */
    many: {
      default: '',
      required: true,
      type: String,
    },
    /**
     * Product unit one label
     */
    one: {
      default: '',
      required: true,
      type: String,
    },
    /**
     * Product unit quantity
     */
    quantity: {
      default: 0,
      required: true,
      type: Number,
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Avoid directly mutation the passed quantity property
       * @type {number}
       */
      quantityModel: this.quantity,
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  computed: {
    /**
     * Product unit color state depending on the quantity
     * @return {string}
     */
    color() {
      let quantity = this.control === 'slider' ? this.quantityModel : this.quantity;
      return quantity > this.alert ? 'green' : (quantity === 0 ? 'red' : 'orange');
    },
    /**
     * Product unit quantity depending on the control type
     * @return {string|number}
     */
    computedQuantity() {
      return this.control === 'slider' ? this.quantityModel + '%' : this.quantity;
    },
  }
}
