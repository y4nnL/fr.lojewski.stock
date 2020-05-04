<template>

  <q-dialog position="bottom"
            ref="dialog"
            @hide="onDialogHide">
    <div class="settings-list"
         ref="root">
      <div class="bg-spotted flex q-px-md q-py-sm settings-list-header text-subtitle2 text-white items-center">
        <span>{{ title }}</span>
        <q-space/>
        <q-btn class="settings-list-add"
               icon="close"
               :class="form ? '' : 'settings-list-rotate'"
               @click="add"
               dense
               flat
               round/>
      </div>
      <div>
        <div class="settings-list-list"
             :class="`settings-list-${ form ? 'out' : 'in' }`">
          <q-intersection class="settings-list-item"
                          transition="fade"
                          v-ripple
                          v-for="product in list"
                          :key="product.id"
                          @click.native="edit(product)">
            <q-item>
              <q-item-section avatar>
                <q-avatar rounded>
                  <storage-img class="rounded-borders"
                               spinner-color="white"
                               transition="fade"
                               :ratio="4/3"
                               :src="product.id">
                    <template v-slot:loading>
                      <q-spinner-gears color="white"
                                       size="xs"/>
                    </template>
                  </storage-img>
                </q-avatar>
              </q-item-section>
              <q-item-section>{{ product.name }}</q-item-section>
            </q-item>
          </q-intersection>
        </div>
        <settings-form class="settings-list-form"
                       ref="form"
                       :product="product"
                       :class="`settings-list-${ form ? 'in' : 'out' }`"
                       @cancel="onFormCancel"></settings-form>
      </div>
    </div>
  </q-dialog>

</template>
<style lang="scss" scoped>@import './SettingsList';</style>
<script src="./SettingsList.js"></script>
