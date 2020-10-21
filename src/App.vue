<template>
  <v-app>
    <v-app-bar
      app
      color="light-green"
      
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('../src/assets/lakes_logo.png')"
          transition="scale-transition"
          width="70"
        />

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <project/>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Project from './components/Project';


export default {
  name: 'App',

  components: {
  //  HelloWorld,
    Project,
  },

  data: () => ({
    //
  }),
};
</script>
