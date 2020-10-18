<template>
  <div class="header headerColor" v-bind:class="{ headerColorSignIn: isSignedIn }">
    <img class="header-icon" src="favicon.ico" />

    <div class="sign-out">
      <router-link v-if="isSignedIn" class="dice-section" to="/signOut">
        <img  class="sign-out-icon" src="@/assets/SignOut.png" />
        <p  class="header-link-text">SignOut</p>
      </router-link>
    </div>

    <div class="icons">
      <router-link v-if="!isSignedIn" class="dice-section" to="/signUp">
        <img  class="section-icon" src="@/assets/signUp.png" />
        <p  class="icon-text">SignUp</p>
      </router-link>

      <router-link class="dice-section" to="/logIn">
        <img v-if="!isSignedIn" class="section-icon" src="@/assets/SignIn.png" />
        <p v-if="!isSignedIn" class="icon-text">LogIn</p>
      </router-link>

      <router-link v-if="isSignedIn" class="dice-section" to="/userApps">
        <img  class="section-icon" src="@/assets/Activities.png" />
        <p  class="icon-text">Your Apps</p>
      </router-link>

      <router-link v-if="isSignedIn" class="dice-section" to="/createActivity">
        <img class="section-icon" src="@/assets/CreateActivity.png" />
        <p class="icon-text">Create</p>
      </router-link>

      <router-link v-if="isSignedIn" class="dice-section" to="/profile">
        <img class="section-icon" src="@/assets/Accounts.png" />
        <p class="icon-text">Profile</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    isSignedIn: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header {
  height: 100px;
  width: 100%;
  color: #ffffff;
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.headerColor {
  background-color: #004571;
    opacity: 0.7;

}
.headerColorSignIn {
  background-color: #004571;
  opacity: 1;
}

.header-link-text {
  font-weight: bold;
  color: #e57100;
  margin: 0;
}

.header-icon {
  height: 42px;
  width: 42px;
  margin-left: 25px;
}

.icons {
  height: 100px;
  position: absolute;
  left: 30%;
  display: flex;
  align-items: center;
}
.icons:hover {
}

.icon-text {
  color: white;
  text-decoration: none !important;
  line-height: 2px;
}
.icon-text:hover {
  font-size: bold;
  text-decoration: none !important;
}
.section-icon {
  height: 40px;
  width: 40px;
  margin-top: 20px;
}
.dice-section {
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 100%;
}

.dice-section:hover {
  opacity: 0.75;
  font-weight: bold;
  height: 110%;
  visibility: visible;
  transition: all 0.25s;
  background-color: #f1dff21c;
}

.router-link-active {
  opacity: 1;
  visibility: visible;
  margin: 5px 0 5px;
  transition: all 0.25s;
  background-color: #f1dff21c;
}
.sign-out {
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 100%;
  height: 100;
  justify-content: space-between;
  margin-right: 110px;
}
.sign-out-icon {
  height: 40px;
  width: 40px;
  margin-top: 20px;
  margin-left: 12px;
}
</style>
