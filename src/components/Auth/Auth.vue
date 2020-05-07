<template>

  <q-page-container>
    <q-page class="bg-calm flex items-center justify-center">
      <q-card>
        <q-card-section class="bg-spotted text-white">
          <div class="text-h6">Bienvenue sur Stock</div>
          <div class="text-subtitle2">Connexion</div>
        </q-card-section>
        <q-form @submit.prevent.stop="submit">
          <q-card-section>
            <q-input class="auth-input q-my-md"
                     color="accent"
                     placeholder="Email"
                     ref="username"
                     type="email"
                     v-model="username"
                     :disable="isSubmitting"
                     outlined>
              <template v-slot:prepend>
                <q-icon name="person"/>
              </template>
            </q-input>
            <q-input class="auth-input q-my-md"
                     color="accent"
                     placeholder="Mot de passe"
                     ref="password"
                     type="password"
                     v-model="password"
                     :disable="isSubmitting"
                     outlined>
              <template v-slot:prepend>
                <q-icon name="lock"/>
              </template>
            </q-input>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-actions align="right"
                          class="q-pa-md">
            <q-btn class="bg-secondary text-white"
                   type="submit"
                   :disable="!isValid"
                   :loading="isSubmitting"
                   flat>
              Connexion
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-page>
  </q-page-container>

</template>
<style lang="scss" scoped>@import './Auth';</style>
<script src="./Auth.js"></script>
