<template>
  <div disabled>
        <div class="text-h5 text-center q-mb-md"> Blocklist </div>
        <q-checkbox  v-model="blocklistEnabled"
                     label="Enable blocklist" />
        <q-input outlined
                 bottom-slots
                 value=""
                 :disable="!blocklistEnabled"
                 readonly
                 >
            <template v-slot:after>
                <q-btn dense flat :disable="!blocklistEnabled">Update</q-btn>
              </template>
            <template v-slot:hint>Blocklist has {{data['blocklist-size']}} rules</template>
          </q-input>


  </div>
</template>
<script>
import {mapActions, mapState } from 'vuex';
export default {
    name: "BlocklistSettings",
    methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),
        blocklistEnabled: {
            get () { return this.data['blocklist-enabled'] },
            set (value) { this.updateSettings({'blocklist-enabled': value})}
        }
    }
}
</script>
