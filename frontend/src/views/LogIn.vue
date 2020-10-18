<template>
  <div class="logIn">
    <h2>LogIn</h2>
    <input
      type="Text"
      class="input"
      v-model="username"
      placeholder="Enter the Your Username "
    />
    <input
      type="password"
      class="input"
      v-model="password"
      placeholder="Enter the Your Password "
    />
    <button class="btn" v-on:click="CheckSignIn">LogIn</button>
    <transition name="alert-in">
      <h3 class="alret" v-if="user.isSignedIn">Welcome {{ user.username }}</h3>
    </transition>
    <transition name="alert-in">
      <p class="alret" v-if="user.isSignedIn">You are loged in</p>
    </transition>
    <transition name="alert-in">
      <h3 v-if="allErrors.length && !user.isSignedIn">
        Errors: {{ allErrors[0] }}
      </h3>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  components: {},
  props: ["user"],
  data() {
    return {
      allErrors: [],
      username: "",
      password: "",
      userId: -1,
    };
  },
  methods: {
    async CheckSignIn() {
      const jwtDecode = require("jwt-decode").default;
      const accountToBeCreated = {
        username: this.username,
        password: this.password,
        grant_type: "password",
      };

      const headers = new Headers();

      // Add the access token if signed in.
      if (this.user.accessToken != null) {
        headers.append("Authorization", "Bearer " + this.user.accessToken);
      }

      headers.append("Content-Type", "application/x-www-form-urlencoded" );

      const account = new URLSearchParams();
      for (const key of Object.keys(accountToBeCreated)) {
        account.append(key, accountToBeCreated[key]);
      }

      const requestOptions = {
        method: "POST",
        headers,
        body: account.toString(),
      };

      const response = await fetch(
        "http://localhost:3000/tokens",
        requestOptions
      );

      if (response.status == "200") {
        const body = await response.json();
        console.log("Body: ", body);

        const accessToken = body.access_token;
        const idToken = body.id_token;
        const dataInIdToken = jwtDecode(idToken);
        const dataInAccessToken = jwtDecode(accessToken);
        console.log("accessToken: ", accessToken);
        console.log("idToken: ", idToken);
        console.log("dataInIdToken: ", dataInIdToken);
        console.log("dataInAccessToken: ", dataInAccessToken);

        const statusCode = response.status;
        console.log(statusCode);

        this.user.username = dataInIdToken.preferred_username;
        this.user.userId = dataInIdToken.sub;
        this.user.isSignedIn = true;
        this.user.accessToken = accessToken;
        this.afterLogin();
        return body;
      } else {
        if (response.status == "404") {
          this.allErrors = ["there is no account with this user name"];
        } else {
          const body = await response.json();
          const errors = body.error;
          console.log("errors: ", errors);
          this.allErrors = [errors];
          console.log("all errors: ", this.allErrors);
          return errors;
        }
      }
    }, afterLogin(){
      
      setTimeout(() => this.$router.push('/userApps'), 1500);

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logIn {
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
.input {
  width: 200px;
  margin: 5% 10px 10px;
  border: 5px solid white;
  -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1),
    0 0 16px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1), 0 0 16px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1), 0 0 16px rgba(0, 0, 0, 0.1);
  padding: 15px;
  background: rgba(255, 255, 255, 0.5);
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
  margin-top: 25px;
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
  margin: 10px 0 5px;
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
