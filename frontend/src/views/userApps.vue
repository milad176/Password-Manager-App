<template>
  <div class="passwords">
    <h2> Passwords</h2>

    <table class="table-fill">
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">accountId</th>
          <th class="text-left">name</th>
          <th class="text-left">password</th>
          <th class="text-left">remove</th>
          <th class="text-left">Edit</th>
        </tr>
      </thead>
      <tbody class="table-hover">
        <tr v-for="activity in allUserPasswords" :key="activity.id">
          <td class="text-left">{{ activity.id }}</td>
          <td class="text-left">{{ activity.accountId }}</td>
          <td class="text-left">{{ activity.applicationName }}</td>
          <td class="text-left">{{ activity.applicationPassword }}</td>
          <td class="text-left">
            <i class="fa fa-minus-circle" v-on:click="remove(activity.id)"></i>
          </td>
          <td class="text-left">
            <router-link   :to="'/edit/' + activity.id">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
        <transition name="alert-in">
        <p v-if="afterRemove" class="alert">Chossen activity is removed.</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: "UserApps",
  components: {},
  props: ["user"],
  data() {
    return {
      allUserPasswords: [],
      afterRemove:false

    };
  },
  methods: {
    async CheckSignIn() {
      const accountId = this.user.userId;

      const headers = new Headers();

      // Add the access token if signed in.
      if (this.user.accessToken != null) {
        headers.append("Authorization", "Bearer " + this.user.accessToken);
      }

      headers.append("Content-Type", "application/json" );

      const requestOptions = {
        method: "GET",
        headers,
      };

      const response = await fetch(
        "http://localhost:3000/applications/" + accountId,
        requestOptions
      );

      if (response.status == "200") {
        const body = await response.json();
        console.log("Body: ", body);
        const statusCode = response.status;
        console.log(statusCode);
        this.allUserPasswords = body;
        return body;
      } else {
        const body = await response.json();
        const errors = body.error;
        console.log("errors: ", errors);
        return errors;
      }
    },
    async remove(id) {

      const headers = new Headers();

      // Add the access token if signed in.
      if (this.user.accessToken != null) {
        headers.append("Authorization", "Bearer " + this.user.accessToken);
      }

      headers.append("Content-Type", "application/json" );

      const requestOptions = {
        method: "DELETE",
        headers,
      };

      const response = await fetch(
        "http://localhost:3000/applications/" + id,
        requestOptions
      );

      this.CheckSignIn();

      if (response.status == "200") {
         this.afterRemove=true;
      } else {
        const body = await response.json();
        const errors = body.error;
        console.log("errors: ", errors);
        return errors;
      }
    },
  },
  created() {
    this.CheckSignIn();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

.table-fill {
  background: white;
  border-radius: 3px;
  border-collapse: collapse;
  height: 320px;
  margin: auto;
  max-width: 600px;
  padding: 5px;
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: float 5s infinite;
}
th {
  color: #d5dde5;
  background: #1b1e24;
  border-bottom: 4px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size: 23px;
  font-weight: 100;
  padding: 24px;
  text-align: left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}
th.text-left {
  text-align: left;
}
td {
  background: #ffffff;
  padding: 20px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 18px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #c1c3d1;
}
th:first-child {
  border-top-left-radius: 3px;
}

th:last-child {
  border-top-right-radius: 3px;
  border-right: none;
}
tr {
  border-top: 1px solid #c1c3d1;
  border-bottom-: 1px solid #c1c3d1;
  color: #666b85;
  font-size: 16px;
  font-weight: normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}

tr:hover td {
  background: #4e5066;
  color: #ffffff;
  border-top: 1px solid #22262e;
}

tr:first-child {
  border-top: none;
}

tr:last-child {
  border-bottom: none;
}

tr:nth-child(odd) td {
  background: #ebebeb;
}

tr:nth-child(odd):hover td {
  background: #4e5066;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 3px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 3px;
}
td:last-child {
  border-right: 0px;
}

th.text-left {
  text-align: left;
}

th.text-center {
  text-align: center;
}

th.text-right {
  text-align: right;
}

td.text-left {
  text-align: left;
}

td.text-center {
  text-align: center;
}

td.text-right {
  text-align: right;
}
i {
  margin-left: 40%;
  cursor: pointer;
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