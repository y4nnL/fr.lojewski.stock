<template>

  <div class="q-pa-md"
       ref="root">

    <q-form @submit.prevent.stop="submit">
      <!-- NAME -->
      <q-input class="block q-mb-md settings-form-input"
               color="accent"
               label="Nom"
               type="text"
               v-model="modelName"
               outlined
               stack-label/>
      <!-- ID -->
      <q-input class="block q-my-md settings-form-input"
               color="accent"
               disabled
               label="Identifiant"
               type="text"
               :value="id"
               outlined
               stack-label/>
      <!-- TYPE -->
      <q-select :options="types"
                class="block q-my-md settings-form-input"
                color="accent"
                label="Type"
                v-model="modelType"
                outlined
                stack-label/>
      <!-- IMAGE -->
      <div class="block">
        <template v-if="modelImage">
          <q-img class="rounded-borders"
                 spinner-color="white"
                 transition="fade"
                 :ratio="16/9"
                 :src="modelImage.base64"
                 v-ripple>
            <div class="absolute-bottom settings-form-img">
              <span class="text-h6">{{ modelName || '' }}</span><br>
              <span>Toucher pour changer l'image</span>
            </div>
            <q-file class="absolute-full"
                    @input="onImageInput($event)"
                    borderless />
            <template v-slot:loading>
              <q-spinner-gears color="white"/>
            </template>
          </q-img>
        </template>
        <template v-else>
          <storage-img class="rounded-borders"
                       spinner-color="white"
                       transition="fade"
                       :ratio="16/9"
                       :src="modelId"
                       v-ripple>
            <div class="absolute-bottom settings-form-img">
              <span class="text-h6">{{ modelName || '' }}</span><br>
              <span>Toucher pour changer l'image</span>
            </div>
            <q-file class="absolute-full"
                    @input="onImageInput($event)"
                    borderless />
            <template v-slot:loading>
              <q-spinner-gears color="white"/>
            </template>
          </storage-img>
        </template>
      </div>
      <p class="q-mt-lg q-mb-none">Gestion du stock</p>
      <transition-group name="settings-form-flip"
                        tag="div">
        <div class="content-stretch flex q-my-md row q-pr-md q-py-md rounded-borders settings-form-unit"
             v-for="(modelUnit, index) in modelUnits"
             :key="modelUnit.__key">
          <div class="col-3 content-center flex items-stretch justify-center relative-position row">
            <div class="absolute bg-spotted flex flex-center rounded-borders settings-form-unit-index">{{ index + 1 }}
            </div>
            <!-- BUTTONS -->
            <q-btn class="text-primary"
                   icon="keyboard_arrow_up"
                   v-if="modelUnits.length > 1"
                   @click="unitUp(modelUnit)"
                   flat
                   round/>
            <q-btn class="text-primary"
                   icon="keyboard_arrow_down"
                   v-if="modelUnits.length > 1"
                   @click="unitDown(modelUnit)"
                   flat
                   round/>
            <q-btn class="text-primary"
                   icon="delete"
                   v-if="modelUnits.length > 1"
                   @click="unitRemove(modelUnit)"
                   flat
                   round/>
          </div>
          <div class="col-9">
            <!-- CONTROL -->
            <q-select :options="controls"
                      class="bg-white block q-mb-xs"
                      color="accent"
                      label="Type"
                      v-model="modelUnit.control"
                      dense
                      outlined
                      stack-label/>
            <!-- ONE -->
            <q-input class="bg-white block q-my-xs"
                     color="accent"
                     type="text"
                     v-model="modelUnit.one"
                     :label="'Nom' + (unitNeedsMany(modelUnit) ? ' au singulier' : '')"
                     dense
                     outlined
                     stack-label/>
            <!-- MANY -->
            <q-input class="bg-white block q-my-xs"
                     color="accent"
                     label="Nom au pluriel"
                     type="text"
                     v-model="modelUnit.many"
                     v-if="unitNeedsMany(modelUnit)"
                     dense
                     outlined
                     stack-label/>
            <!-- INCREMENT -->
            <q-input class="bg-white block q-my-xs"
                     color="accent"
                     label="Incrémentation"
                     step=".5"
                     type="number"
                     v-model="modelUnit.increment"
                     :suffix="unitSuffix(modelUnit, 'increment')"
                     dense
                     outlined
                     stack-label>
            </q-input>
            <!-- ALERT -->
            <q-input class="bg-white block q-my-xs"
                     color="accent"
                     label="Seuil d'alerte"
                     step=".5"
                     type="number"
                     v-model="modelUnit.alert"
                     :suffix="unitSuffix(modelUnit, 'alert')"
                     dense
                     outlined
                     stack-label>
            </q-input>
            <!-- QUANTITY -->
            <q-input class="bg-white block q-mt-xs"
                     color="accent"
                     label="Quantité"
                     step=".5"
                     type="number"
                     v-model="modelUnit.quantity"
                     :suffix="unitSuffix(modelUnit, 'quantity')"
                     dense
                     outlined
                     stack-label>
            </q-input>
          </div>
        </div>
      </transition-group>
      <div class="flex row justify-center">
        <q-btn class="bg-secondary text-white"
               @click="unitAdd"
               flat>
          Ajouter un stock
        </q-btn>
      </div>
      <q-separator class="q-my-lg"/>
      <div class="flex row"
           :class="{ 'q-mb-md': !!this.product }">
        <q-btn class="bg-spotted col-xs-12 text-white"
               size="lg"
               type="submit"
               flat>
          Enregistrer
        </q-btn>
      </div>
      <div class="flex row"
           v-if="!!this.product">
        <q-btn class="bg-red col-xs-12 text-white"
               size="lg"
               @click="remove"
               flat>
          Supprimer
        </q-btn>
      </div>
    </q-form>
  </div>

</template>
<style lang="scss" scoped>@import './SettingsForm';</style>
<script src="./SettingsForm.js"></script>
