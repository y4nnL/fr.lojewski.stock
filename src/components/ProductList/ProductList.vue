<template>

  <transition name="product-list-fade"
              appear>
    <template v-if="!fetching && list.length">
      <q-pull-to-refresh :disable="ptrDisability"
                         @refresh="refresh">
        <div class="flex items-stretch q-col-gutter-md q-pa-md row">
          <div class="items-stretch col-lg-3 col-md-4 col-sm-6 col-xs-12"
               v-for="product in list"
               :key="product.id">
            <product v-bind="product"
                     @increment="increment(product, $event)"
                     @decrement="decrement(product, $event)"
                     @quantity="quantity(product, $event)"/>
          </div>
        </div>
      </q-pull-to-refresh>
    </template>
    <template v-if="!fetching && !list.length">
      <div class="absolute-top full-width text-center q-pt-lg">
        <p>
          <img src="~assets/sad.svg"
               style="width: 30vw; max-width: 150px;">
        </p>
        <p class="text-faded text-h6">Aucun produit trouvé</p>
        <div class="text-faded"
             v-if="hasFilters">
          <p class="q-ma-none q-mb-xs q-pa-none">Des filtres sont actifs</p>
          <q-btn class="bg-secondary text-white"
                 v-if="hasFilters"
                 @click="resetFilters"
                 flat>
            Supprimer les filtres
          </q-btn>
        </div>
        <q-btn class="bg-secondary text-white"
               flat
               v-else>
          Créer un produit
        </q-btn>
      </div>
    </template>
  </transition>

</template>
<style lang="scss" scoped>@import './ProductList';</style>
<script src="./ProductList.js"></script>
