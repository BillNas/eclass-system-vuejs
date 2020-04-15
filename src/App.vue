<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link v-if="!user" class="navbar-brand" to="/login">Eclass</router-link>
      <router-link v-else class="navbar-brand" to="/">Eclass</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav">
          <li v-if="user" class="nav-item">
            <router-link class="nav-link" to="/">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">
              About
            </router-link>
          </li>
          <li v-if="!user" class="nav-item">
            <router-link class="nav-link" to="/register">
              Register
            </router-link>
          </li>
          <li v-if="!user" class="nav-item">
            <router-link class="nav-link" to="/login">
              Login
            </router-link>
          </li>
          <li v-if="user" class="nav-item">
            <router-link class="nav-link" to="/profile">
              {{ user.user.displayName }} 👤
            </router-link>
          </li>
          <li v-if="user" class="nav-item">
            <router-link to="/lessons" class="nav-link">
              Lessons
            </router-link>
          </li>
          <li v-if="user" class="nav-item">
            <button class="btn btn-info" @click="onSignOut()">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapGetters({
      user: "users/user"
    })
  },
  methods: {
    ...mapActions("users", ["signOut"]),
    onSignOut() {
      this.$store.dispatch("users/signOut");
    }
  }
};
</script>
<style lang="scss"></style>
