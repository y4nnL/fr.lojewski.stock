<template>

  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="flex justify-center items-center auth-page">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Bienvenue sur Stock</div>
            <div class="text-subtitle2">Connexion</div>
          </q-card-section>
          <q-form @submit.prevent.stop="onSubmit">
            <q-card-section>
              <q-input class="auth-input q-my-md"
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
              <q-input class="auth-input q-my-md"
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
<style lang="scss" scoped>@import './Auth';</style>
<script src="./Auth.js"></script>
