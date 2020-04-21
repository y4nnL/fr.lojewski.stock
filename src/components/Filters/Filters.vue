<template>

  <q-layout view="hHh LpR Lfr"
            class="bg-white s-filters"
            container>
    <q-header class="bg-secondary">
      <q-toolbar>
        <q-toolbar-title>
          Filtrer les produits
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md">
        <div>
          <q-input class="s-input q-my-md"
                   color="accent"
                   size="md"
                   outlined
                   square
                   v-model="term">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <transition name="s-fade">
                <q-btn v-show="term"
                       color="accent"
                       @click.stop="term = ''"
                       flat
                       round>
                  <q-icon name="close"
                          class="cursor-pointer" />
                </q-btn>
              </transition>
            </template>
          </q-input>
        </div>
        <div>
          <q-toggle v-model="alert"
                    color="accent">
            <span class="text-subtitle1">Proche de la rupture</span>
          </q-toggle>
        </div>
        <div>
          <q-toggle v-model="os"
                    color="accent">
            <span class="text-subtitle1">En rupture</span>
          </q-toggle>
        </div>
        <q-separator class="q-my-lg" />
        <q-btn class="bg-secondary text-white"
               :disabled="!isReset"
               @click="reset"
               flat>
          Réinitialiser
        </q-btn>
        <div v-if="isReset"
             class="q-my-lg q-pa-md rounded-borders text-center"
             style="background-color: #EEE">
          <span v-if="productsLength">Nous avons trouvé <strong class="text-secondary">{{ productsLength }}</strong> produit{{ productsLength > 1 ? 's' : '' }}</span>
          <span v-else>Aucun produit trouvé</span>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>
<style lang="scss" scoped>@import './Filters';</style>
<script src="./Filters.js"></script>
