<template>
    <div class="container">
        <h1>Your Profile</h1>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                {{ user.user.displayName }}
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
                {{ user.user.email }}
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center" v-if="user.user.firstName">
                {{ user.user.gh }}
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center" v-if="user.user.lastName">
                {{ user.user.h }}
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
                Account Created: {{ user.user.createdAt }}
            </li>

            <li class="list-group-item d-flex justify-content-between align-items-center">
                Verified: {{ user.user.emailVerified }}
            </li>
        </ul>
        <br>
        <h1>Your Lessons</h1>
        <h6 v-for="lesson in lessons" :key="lesson.id">
      <div v-if="lesson.professor ==  user.user.displayName  ">
      <router-link
              :to="{
                name: 'lesson',
                params: {
                  name: lesson.name
                }
              }"
              ><b>⚫ {{lesson.name}}</b></router-link
            ></div>
      </h6>

        <hr />
        <form class="form mt-3" @submit.prevent="onEditProfileData">
            <h1>Edit your profile</h1>
            <div class="form-group">
                <b for="firstName">First Name</b>
                <input type="text" class="form-control" v-model="firstName" />
            </div>
            <div class="form-group">
                <b for="lastName">Last Name</b>
                <input type="text" class="form-control" v-model="lastName" />
            </div>
            <button type="submit" class="btn btn-primary mb-2">Save Changes</button>
        </form>
    </div>
</template>

<script>
    import {
        mapGetters, mapState
    }
    from "vuex";
    export default {
        name: "app",
        data() {
            return {
                firstName: "",
                lastName: ""
            };
        },

        computed: {
            ...mapState("lessons", ["lessons"]),
                ...mapGetters({
                    user: "users/user"
                })
        },
        methods: {
            onEditProfileData() {
                this.$store.dispatch("users/updateUserProfile", {
                    firstName: this.firstName,
                    lastName: this.lastName
                });
            }
        }
    };
</script>

<style></style>