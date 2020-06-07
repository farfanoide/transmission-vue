<template>
  <q-list>
    <q-item>
      <q-inner-loading :loading="loading">
        <q-spinner color="primary"
                   size="3em"
                   :thickness="2">
        </q-spinner>
      </q-inner-loading>
    </q-item>

    <q-item-label header>
      Files
    </q-item-label>
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
  </q-list>
</template>

<script>

import { mapGetters } from 'vuex'
import FilesTree from '../lib/files_tree'

// TODO: add icons and toggles buttons to handle prioritty and 'want/unwant'
export default {
  name: 'FilesList',
  props: ['torrent'],
  data()
  {
    return {
      loading: false
    }
  },
  computed:
  {
    ...mapGetters('configs', ['client']),
    filesTree: function ()
    {
      return FilesTree(this.torrent.files)
    },
    ticked:
    {
      get: function ()
      {
        return this.torrent.wanted.map((e, i) => { if (e) { return i }})
        // let tick =  this.torrent.wanted.map((e, i) => )
        // console.log(tick)
        // return tick
      },
      set: function (ticked)
      {
        // call rpc and set wanted/unwanted
        this.loading = true
        let options = {}

        let filesWanted = ticked.filter(t => Number.isInteger(t))
        let filesUnwanted = Object.keys(this.torrent.files).filter((i) => !ticked.includes(parseInt(i))).map((i) => parseInt(i))

        if (filesWanted.length != 0)
        {
          options['files-wanted'] = filesWanted
        }
        if (filesUnwanted.length != 0)
        {
          options['files-unwanted'] = filesUnwanted
        }

        this.client.set([this.torrent.id], options)
          .finally(() => this.loading = false)
      }
    }
  }
}
</script>
