import { PRODUCT_PLACEHOLDER_IMAGE } from 'src/store/product/constants';
import { QImg } from 'quasar';

export default {
  name: 'StorageImg',
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  mixins: [
    QImg,
  ],
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  props: {
    /**
     * The default placeholder base64 encoded image
     */
    placeholderSrc: {
      default: PRODUCT_PLACEHOLDER_IMAGE,
      type: String,
    },
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  methods: {
    /**
     * Override the default QImg#__load method to handle the Firebase storage Promise based url
     * @private
     */
    __load() {
      clearTimeout(this.ratioTimer);
      this.hasError = false;

      if (!this.src) {
        this.isLoading = false;
        this.image = void 0;
        this.currentSrc = '';
        return;
      }

      this.isLoading = true;

      const img = new Image();
      this.image = img;

      img.onload = () => {
        if (this.destroyed === true) {
          return;
        }

        // if we are still rendering same image
        if (this.image === img) {
          if (img.decode !== void 0) {
            img
              .decode()
              .catch(err => {
                if (this.image === img && this.destroyed !== true) {
                  this.__onError(err);
                }
              })
              .then(() => {
                if (this.image === img && this.destroyed !== true) {
                  this.__onLoad(img);
                }
              });
          } else {
            this.__onLoad(img);
          }
        }
      };

      this.$storageImg(this.src)
        .then((url) => {
          img.src = url;
          if (this.srcset) {
            img.srcset = this.srcset;
          }
          if (this.sizes !== void 0) {
            img.sizes = this.sizes;
          } else {
            Object.assign(img, {
              height: this.height,
              width: this.width,
            });
          }
        })
        .catch(error => {
          // if we are still rendering same image
          if (this.image === img && this.destroyed !== true) {
            this.__onError(error);
          }
        });
    },
  },
};
