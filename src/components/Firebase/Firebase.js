import * as h from 'src/store/product/helpers';
import * as c from 'src/store/product/constants';

export default {
  name: 'Firebase',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  data() {
    return {
      /**
       * Whether is fetching
       * @type {boolean}
       */
      fetching: false,
      /**
       * Collection to fetch from firebase
       * @type {string}
       */
      fetchName: 'stock@stock.com',
      /**
       * Data from firebase
       * @type {Product[]}
       */
      data: null,
      /**
       * Whether is uploading
       * @type {boolean}
       */
      uploading: false,
      /**
       * Data to upload
       * @type {Product[]}
       */
      uploadingData: null,
      /**
       * Whether is upload error
       * @type {boolean}
       */
      uploadError: false,
      /**
       * Collection to upload data
       * @type {string}
       */
      uploadName: '',
    };
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    fetch() {
      if (this.fetchName) {
        this.data = null;
        this.fetching = true;
        this.$firebase.firestore()
          .collection(this.fetchName)
          .orderBy('name')
          .get()
          .then(querySnapshot => {
            this.data = [];
            querySnapshot.forEach((d) => this.data.push(d.data()));
          })
          .catch((e) => {
            this.$refs.fetchName.error = true;
            this.$refs.fetchName.errorMessage = e;
          })
          .finally(() => this.fetching = false);
      }
    },
    show() {
      this.$q.dialog({ message: JSON.stringify(this.data) });
    },
    upload() {
      if (this.uploadName && this.data) {
        this.uploadingData = JSON.parse(JSON.stringify(this.data));
        let set = () => {
          let doc = this.uploadingData.shift();
          if (doc) {
            return this.$firebase.firestore()
              .collection(this.uploadName)
              .doc()
              .set(doc)
              .then(set)
          } else {
            return Promise.resolve();
          }
        };
        this.uploading = true;
        set()
          .catch((e) => {
            console.log(e);
            this.$refs.uploadName.error = true;
            this.$refs.uploadName.errorMessage = e;
          })
          .finally(() => this.uploading = false);
      }
    },
  },
};
