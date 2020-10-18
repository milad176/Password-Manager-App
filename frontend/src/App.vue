<template>
  <div class="body">
    <AppHeader  v-bind:isSignedIn="user.isSignedIn" />
    <router-view :user="user" />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/App-Header.vue";
import AppFooter from "@/components/App-Footer.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      user: {
        isSignedIn: false,
        username: "",
        userId: "",
        accessToken:null
      },
    };
  },
};
</script>

<style>
.body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  margin: 0px 0px;
  line-height: 1.4;
}
</style>
