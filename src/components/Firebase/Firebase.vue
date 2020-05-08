<template>

  <q-page-container class="q-pa-md">
    <q-form class="q-mb-xl"
            :disabled="fetching || uploading"
            @submit.stop="fetch">
      Fetch from
      <q-input class="q-mb-md"
               label="Fetch from"
               ref="fetchName"
               v-model="fetchName"
               :rules="[
                 v => !!v || 'Required',
                 v => /[a-z0-9\.\-$@]/.test(v) || 'Wrong collection name'
               ]"
               outlined/>
      <div class="flex justify-between row">
        <q-btn class="bg-primary text-white"
               type="submit"
               :disabled="!fetchName || ($refs.fetchName && $refs.fetchName.hasError)"
               :loading="fetching"
               flat>fetch
        </q-btn>
        <q-btn class="bg-primary text-white"
               v-if="data"
               @click="show"
               flat>({{ data.length }}) items
        </q-btn>
      </div>
      <q-separator class="q-my-lg"/>
      Or past json
      <q-input ref="json"
               type="textarea"
               v-model="json"
               :rules="[ validateJson ]"
               outlined/>
    </q-form>
    <q-form v-show="data && data.length"
            ref="uploadForm"
            :disabled="uploading"
            @submit.stop="upload"
            class="q-mb-md">
      <q-input class="q-mb-md"
               label="Upload to"
               ref="uploadName"
               v-model="uploadName"
               :rules="[
                 v => !!v || 'Required' ,
                 v => v !== fetchName || 'Can not be ' + fetchName,
                 v => /[a-z0-9\.\-$@]/.test(v) || 'Wrong collection name',
               ]"
               outlined/>
      <div class="flex justify-between row">
        <q-btn class="bg-primary text-white"
               type="submit"
               :disabled="!uploadName || ($refs.uploadName && $refs.uploadName.hasError)"
               :loading="uploading"
               flat>
          Upload
          <template v-slot:loading>
            ... ({{ uploadingData.length }})
          </template>
        </q-btn>
      </div>
    </q-form>
  </q-page-container>

</template>
<script src="./Firebase.js"></script>
