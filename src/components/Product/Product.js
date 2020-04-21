import SProductUnit from '../ProductUnit/ProductUnit.vue';

export default {
  name: 'SProduct',
  components: {
    SProductUnit
  },
  props: {
    id: {
      type: String,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    units: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    imagePath() {
      return '/statics/products/' + this.id + '.jpg';
    }
  }
}
