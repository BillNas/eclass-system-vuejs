import firebase from "firebase";
import router from "@/router";

const state = {
    user: null,
    status: null,
    error: null
};
const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
    removeUser(state) {
        state.user = null;
    },
    setStatus(state, payload) {
        state.status = payload;
    },
    setError(state, payload) {
        state.error = payload;
    }
};
const actions = {
    async signUp({ commit }, payload) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                firebase.auth().currentUser.updateProfile({
                    displayName: `${payload.firstName} ${payload.lastName}`
                });
                commit("setError", null);
                router.push("/");
                commit("setUser", user);
            })
            .catch(error => {
                commit("setError", error);
            });
    },
    async signIn({ commit }, payload) {
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit("setUser", user);
                commit("setError", null);
                router.push("/");
            })
            .catch(error => {
                commit("setError", error);
            });
    },
    async signOut({ commit }) {
        firebase.auth().signOut();
        commit("setUser", null);
        router.push("/login");
    },
    async updateUserProfile({ commit }, payload) {
        try {
            firebase.auth().currentUser.updateProfile({
                displayName: `${payload.firstName} ${payload.lastName}`
            });
            commit("setError", null);
            alert(
                "Your profile was updated succesfully. Please login again to confirm them."
            );
        } catch (error) {
            commit("setError", error);
        }
    }
};
const getters = {
    user(state) {
        return state.user;
    },
    error(state) {
        return state.error;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};