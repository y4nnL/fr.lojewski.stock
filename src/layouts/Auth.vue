<template>

  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="flex justify-center items-center s-page">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Bienvenue sur Stock</div>
            <div class="text-subtitle2">Connexion</div>
          </q-card-section>
          <q-form @submit.prevent.stop="onSubmit">
            <q-card-section>
              <q-input class="s-input q-my-md"
                       type="email"
                       ref="username"
                       color="accent"
                       placeholder="Email"
                       outlined
                       square
                       :disable="submitting"
                       v-model="username">
                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>
              </q-input>
              <q-input class="s-input q-my-md"
                       type="password"
                       ref="password"
                       color="accent"
                       placeholder="Mot de passe"
                       outlined
                       square
                       :disable="submitting"
                       v-model="password">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>
              </q-input>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-actions class="q-pa-md"
                            align="right">
              <q-btn flat
                     type="submit"
                     :disable="!isValid"
                     :loading="submitting"
                     class="bg-secondary text-white">
                Connexion
              </q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>

</template>
<style scoped>

  .s-input {
    font-size: 130%;
    width: 300px;
  }
  .s-page {
    background: linear-gradient(16deg, rgba(194,203,209,1) 0%, rgba(230,233,236,1) 100%);
  }

</style>
<script>

  import { AUTH_DISPATCH_LOGIN } from '../store/auth/constants';
  import { ROUTE_NAME_PRODUCTS } from '../router/constants';

  export default {
    name: 'Auth',
    data() {
      return {
        submitting: false,
        error: false,
        username: '',
        password: ''
      };
    },
    methods: {
      onSubmit() {
        if (this.isValid) {
          this.submitting = true;
          this.error = false;
          this.$store.dispatch(AUTH_DISPATCH_LOGIN, { username: this.username, password: this.password })
            .then(() => {
              this.$router.push({ name: ROUTE_NAME_PRODUCTS });
            })
            .catch(() => {
              this.$q.dialog({
                message : 'Connexion impossible'
              });
            })
            .finally(() => {
              this.submitting = false;
            });
        }
      }
    },
    computed: {
      isValid() {
        return !!(!this.submitting && this.username && this.password);
      }
    }
  };

</script>
