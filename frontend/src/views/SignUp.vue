<template>
  <div class="signUp">
    <h2>SignIn</h2>
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
    <button class="btn" v-on:click="createAccount">SignUp</button>
    <transition name="alert-in">
      <h3 v-if="id" class="alert">
        Your Account with id: {{ id }} is successfully created.
      </h3>
      <h3 v-if="allErrors.length && !id" class="alert">
        ERROR: {{ allErrors[0] }} 
      </h3>
    </transition>
    <router-link v-if="id" to="/logIn">click here for <a>Login</a></router-link>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      id: "",
      allErrors: [],
    };
  },
  methods: {
    async createAccount() {
      const accountToBeCreated = {
        username: this.username,
        password: this.password,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountToBeCreated),
      };

      const response = await fetch(
        "http://localhost:3000/accounts",
        requestOptions
      );
      const data = await response;
      const statusCode = response.status;
      if (statusCode === 201) {
        const locationHeader = response.headers.get("Location");
        this.id = parseInt(locationHeader.substr("/accounts/".length));
        console.log(locationHeader);
        console.log(data);
      } else {
        const body = await response.json();
          const errors = body.error;
          console.log("errors: ", errors);
          this.allErrors = [errors];
          console.log("all errors: ", this.allErrors);
          return errors;
      }

      return data;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signUp {
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
