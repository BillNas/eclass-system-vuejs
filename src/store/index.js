/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import lessons from './lessons';
import users from './users';
import posts from './posts';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    mutations: vuexfireMutations,
    modules: {
        users,
        lessons,
        posts,

    },
});