<template>
  <div class="signOut">
    <h2>signed out</h2>
    <button class="btn" v-on:click="UserSignOut">SignOut</button>
    <transition name="alert-in">
      <p class="alret" v-if="!user.isSignedIn">
        You are successfully signed out.
      </p>
    </transition>
    <!-- <p>
      <router-link to="/logIn">Back</router-link>
    </p> -->
  </div>
</template>

<script>
export default {
  name: "SignOut",
  components: {},
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    UserSignOut() {
      // The SDK has now forgot which account you previously signed in to.
      this.user.accessToken = null;
      this.user.isSignedIn = false;
      this.afterLogin();
    },afterLogin(){
      
      setTimeout(() => this.$router.push('/logIn'), 1500);

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signOut {
  margin-top: 40px;
  max-width: 500px;
  min-height: 300px;
  padding: 2% 1% 6%;
  margin-right: auto;
  margin-bottom: auto;
  margin-left: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.1);
}
.btn {
  color: white;
  height: 25px;
  background-color: #4c8ecb;
  border: 1px solid #19184e;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  margin-right: auto;
  margin-left: auto;
  width: 90px;
  height: 35px;
  margin-bottom: 40px;
  margin-top: 90px;
}
.btn:hover {
  transition-duration: 0.4s;
  background-color: #1e90ff;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid blue;
  border-radius: 4px;
}
.alret {
  font-size: 24px;
  font-weight: bold;
  margin-left: 4px;
  margin: 10px 0 65px;
}
.alert-in-enter-active {
  animation: bounce-in 0.5s;
}
.alert-in-leave-active {
  animation: bounce-in 0.1s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
