<template>
    <div class="container">
        <div v-if="error" class="alert alert-dismissible alert-danger mt-2">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <small>{{ error }}</small>
        </div>
        <form class="form mt-2" @submit.prevent="onSignIn">
            <legend>Login</legend>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-success">Login</button>
        </form>
    </div>
</template>

<script>
    import {
        mapGetters, mapActions
    }
    from "vuex";
    export default {
        data() {
                return {
                    email: "",
                    password: ""
                };
            },
            methods: {
                ...mapActions("users", ["signIn"]),
                    onSignIn() {
                        this.$store.dispatch("users/signIn", {
                            email: this.email,
                            password: this.password
                        });
                    }
            },
            computed: {
                ...mapGetters({
                    error: "users/error"
                })
            }
    };
</script>

<style></style>