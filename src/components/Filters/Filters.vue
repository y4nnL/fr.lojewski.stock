<template>
  <div ref="rootElement">
      <div class="bg-calm text-white q-px-md q-py-sm text-h6">
          Filtrer les produits
      </div>
      <div class="q-px-md q-pt-md">
        <div>
          <q-input class="filters-input q-my-xs"
                   color="accent"
                   size="md"
                   outlined
                   square
                   v-model="term">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <transition name="filters-fade">
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
          <q-toggle v-model="os"
                    color="accent">
            <span class="text-subtitle1">En rupture</span>
          </q-toggle>
        </div>
      </div>
  </div>

</template>
<style lang="scss" scoped>@import './Filters';</style>
<script src="./Filters.js"></script>
