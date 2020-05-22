<template>
  <q-list>
    <q-item-label header>
      Files
    </q-item-label>
    <q-tree node-key="label"
            default-expand-all
            :nodes="filesTree">
    </q-tree>
  </q-list>
</template>

<script>

import FilesTree from '../lib/files_tree'

// TODO: add icons and toggles buttons to handle prioritty and 'want/unwant'
export default {
  name: 'FilesList',
  props: ['files'],
  computed:
  {
    filesTree: function ()
    {
      return FilesTree(this.files)
    }
  }
}
</script>
