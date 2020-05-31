<template>
  <q-list>
    <q-item-label header>
      Files
    </q-item-label>
    <template v-if='files === undefined'>
      <q-item>
        <q-inner-loading :showing="files === undefined">
          <q-spinner color="primary"
                     size="3em"
                     :thickness="2">
          </q-spinner>
        </q-inner-loading>
      </q-item>
    </template>
    <template v-else>
      <q-tree node-key="index"
              default-expand-all
              tick-strategy="leaf"
              :ticked.sync="ticked"
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
    </template>
  </q-list>
</template>

<script>

import FilesTree from '../lib/files_tree'

// TODO: add icons and toggles buttons to handle prioritty and 'want/unwant'
export default {
  name: 'FilesList',
  props: ['files', 'file-stats'],
  computed:
  {
    filesTree: function ()
    {
      return FilesTree(this.files)
    },
    ticked:
    {
      get: function ()
      {
        return this.fileStats.map((fs, i) => { if (fs.wanted) return i })
      },
      set: function (value)
      {
        // call rpc and set wanted/unwanted
        console.log(value)
      }
    }
    // TODO: move ticked to a computed property
  }
}
</script>
