export default {
  name: 'SProductUnit',
  props: {
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    increment: {
      type: Number,
      required: true,
      default: 1
    },
    one: {
      type: String,
      required: true,
      default: ''
    },
    many: {
      type: String,
      required: true,
      default: ''
    },
    alert: {
      type: Number,
      required: true,
      default: 0
    },
    control: {
      type: String,
      required: true,
      default: 'number'
    }
  },
  computed: {
    computedQuantity() {
      return this.control === 'slider' ? 1 : this.quantity;
    },
    color() {
      return this.quantity > this.alert ? 'green' : (this.quantity === 0 ? 'red' : 'orange');
    }
  }
}
