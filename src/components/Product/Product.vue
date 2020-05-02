<template>

  <q-card class="full-height">
    <q-img class="product-img"
           spinner-color="white"
           transition="fade"
           :placeholder-src="placeholderSrc"
           :src="imagePath">
      <div class="absolute-bottom product-title text-h6">{{ name }}</div>
      <template v-slot:loading>
        <q-spinner-gears color="white"/>
      </template>
    </q-img>
    <q-card-actions>
      <product-unit class="q-pl-sm"
                    v-bind="unit"
                    v-for="(unit, index) in units"
                    :key="index"
                    @increment="$emit('increment', { productUnitIndex: index })"
                    @decrement="$emit('decrement', { productUnitIndex: index })"
                    @quantity="$emit('quantity', { productUnitQuantity: $event, productUnitIndex: index, })"/>
    </q-card-actions>
  </q-card>

</template>
<style lang="scss" scoped>@import './Product';</style>
<script src="./Product.js"></script>
