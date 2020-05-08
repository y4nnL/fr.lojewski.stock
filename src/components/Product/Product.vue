<template>

  <q-card class="full-height">
    <storage-img class="product-img"
                 spinner-color="white"
                 transition="fade"
                 :ratio="16/9"
                 :src="id">
      <div class="absolute-bottom product-title text-h6">{{ name }}</div>
      <template v-slot:loading>
        <q-spinner-gears color="white"/>
      </template>
    </storage-img>
    <q-card-actions>
      <product-unit class="q-pl-sm"
                    v-bind="unit"
                    v-for="unit in units"
                    :key="unit.id"
                    @increment="$emit('increment', { productUnitId: unit.id })"
                    @decrement="$emit('decrement', { productUnitId: unit.id })"
                    @quantity="$emit('quantity', { productUnitQuantity: $event, productUnitId: unit.id, })"/>
    </q-card-actions>
  </q-card>

</template>
<style lang="scss" scoped>@import './Product';</style>
<script src="./Product.js"></script>
