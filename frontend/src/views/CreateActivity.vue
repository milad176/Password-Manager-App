<template>
  <div class="createActivity">
    <h2>Create New Password</h2>
    <div>
      <input
        type="Text"
        class="input"
        v-model="name"
        placeholder="Enter the new App Name "
      />
    </div>

    <div>
      <input
        type="Text"
        step="any"
        class="input"
        v-model="password"
        placeholder="Enter the new App password "
      />
    </div>
    <button class="btn" v-on:click="CreateNewPass">Create</button>
    <transition name="alert-in">
      <h3 v-if="newPassId" class="alert">
        New Password with id: {{ newPassId }} is successfully created.
      </h3>
      <h3 v-if="allErrors.length && !newPassId" class="alert">
        ERROR: {{ allErrors[0] }} 
      </h3>
    </transition>
    <router-link to="/userApps">Back</router-link>
    <!-- <h1 v-if="allErrors.length">Errors:{{ allErrors }}</h1> -->
  </div>
</template>

<script>
export default {
  name: "CreateActivity",
  components: {},
  props:  ["user"],
  data() {
    return {
      id: this.$route.params.id,
      newPassId:'',
      name: "",
      password: "",
      allErrors: [],
      afterUpdate: false,
    };
  },
  methods: {
    async CreateNewPass() {
      const newPassInfo = {
        accountId:this.user.userId,
        applicationName: this.name,
        applicationPassword: this.password,
      };

      const headers = new Headers();

      // Add the access token if signed in.
      if (this.user.accessToken != null) {
        headers.append("Authorization", "Bearer " + this.user.accessToken);
      }
      
      headers.append("Content-Type", "application/json" );
      const requestOptions = {
        method: "POST",
        headers,
        body: JSON.stringify(newPassInfo)
      };

      const response = await fetch(
        "http://localhost:3000/applications/",
        requestOptions
      );

      if (response.status == "201") {
        const locationHeader = response.headers.get("Location");
        this.newPassId = parseInt(locationHeader.substr("/appsPasswords/".length));
        this.name="";
        this.password='';
      } else {
          const body = await response.json();
          const errors= body.error;
          console.log("errors: ", errors);
          this.allErrors=[errors];
          console.log("all errors: ", this.allErrors);
          return errors;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createActivity {
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
  margin: 1% 5px 10px;
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
  margin-top: 30px;
  margin-bottom: 30px;
}
.title {
  margin-top: 20px;
}
.btn:hover {
  transition-duration: 0.4s;
  background-color: #1e90ff;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid blue;
  border-radius: 4px;
}
.alert {
  font-size: 24px;
  font-weight: bold;
  margin-left: 4px;
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
