<template>
  <div class="login">
    <h2>Welcome</h2>
    <div>
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" v-model="email" required="required"/>
          <label class="control-label" for="email">
            Email
          </label>
          <i class="bar"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" v-model="password" required="required"/>
          <label class="control-label" for="password">
            Password
          </label>
          <i class="bar"/>
        </div>
      </div>
      <div class="d-flex align--center">
        <button v-on:click="Login()" class="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    Login() {
      var today = new Date().getHours();
      if (
        this.email == "mulavhe@gmail.com" &&
        this.password == "Mulavhelesi@" + today
      ) {
        this.$router.push({ name: "dashboard" });
      } else {
        this.showToast("Incorrect login details", {
          icon: "fa-error",
          position: "top-left",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login {
  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      display: none;
    }
  }

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 3.125rem;
  }
}
</style>
