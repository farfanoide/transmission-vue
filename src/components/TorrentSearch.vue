<template>
  <q-form @submit="onSubmit" class="q-mx-md">
    <q-input
      rounded
      standout
      dark
      dense
      label="Quick Search"
      input-class="text-right"
      class="q-ml-md"
      v-model="searchString"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </q-form>
</template>
<script>
export default {
  name: "TorrentSearch",
  methods: {
    onSubmit() {
      this.$q.bex.send("app.pirateSearch", { searchString: this.searchString });
    }
  },
  data() {
    return {
      searchString: ""
    };
  }
};
</script>
