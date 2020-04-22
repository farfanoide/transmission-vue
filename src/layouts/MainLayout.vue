<template>
  <q-layout view="hhh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to='/'>
            <q-avatar size="40px">
              <img src="~assets/logo.png" />
            </q-avatar>
          </router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- <q&#45;drawer v&#45;model="left" side="left" elevated> -->
    <!--   <!&#45;&#45; drawer content &#45;&#45;> -->
    <!-- </q&#45;drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false
    }
  }
}
</script>
