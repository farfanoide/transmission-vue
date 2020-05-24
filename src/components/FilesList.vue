<template>
  <q-list>
    <q-item-label header>
      Files
    </q-item-label>
    <q-tree node-key="label"
            default-expand-all
            :nodes="filesTree">
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <span>
            <q-icon class="q-mr-sm"
                    :size="prop.node.isLeaf ? 'xs' : 'sm'"
                    :name="prop.node.icon ? prop.node.icon : (prop.expanded ? 'folder_open' : 'folder')">
            </q-icon>
            {{ prop.node.label }}
          </span>
        </div>
      </template>
    </q-tree>
  </q-list>
</template>

<script>

import FilesTree from '../lib/files_tree'

// TODO: add icons and toggles buttons to handle prioritty and 'want/unwant'
export default {
  name: 'FilesList',
  props: ['files', 'fileStats'],
  computed:
  {
    filesTree: function ()
    {
      return FilesTree(this.files)
    }
  }
}
</script>
