<template>
    <div class="container">
        <div v-if="error" class="alert alert-dismissible alert-danger mt-2">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <small>{{ error }}</small>
        </div>
        <form class="form mt-2" @submit.prevent="onSignUp">
            <legend>Register</legend>
            <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" class="form-control" v-model="firstName" placeholder="Enter your first name" />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" v-model="lastName" placeholder="Enter your last name" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-success">Register</button>
        </form>
    </div>
</template>

<script>
    import {
        mapActions, mapGetters
    }
    from "vuex";
    export default {
        data() {
                return {
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: ""
                };
            },
            computed: {
                ...mapGetters({
                    error: "users/error"
                })
            },
            methods: {
                ...mapActions("users", ["signUp"]),
                    onSignUp() {
                        this.$store.dispatch("users/signUp", {
                            email: this.email,
                            password: this.password,
                            firstName: this.firstName,
                            lastName: this.lastName
                        });
                    }
            }
    };
</script>

<style></style>