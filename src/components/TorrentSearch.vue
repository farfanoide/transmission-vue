<template>
  <q-form @submit="onSubmit">
    <q-input
      rounded
      dense
      label="Quick Search"
      input-class="text-right"
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
