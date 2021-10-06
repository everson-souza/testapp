<template>
  <div class="home">
  <v-app-bar
      app
      color="light-green"
      
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/lakes_logo.png')"
          transition="scale-transition"
          width="100"
        />

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <project/>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
import Project from '@/components/Project.vue'

export default {
  name: 'Home',
  components: {
    Project
  }
}
</script>
