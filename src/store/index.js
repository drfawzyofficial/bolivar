import Vue from 'vue';
import Vuex from 'vuex';

import { Auth } from './Auth';
import { Alert } from './Alert';
import { FeedbackManagement } from './Feedback';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        Auth,
        Alert,
        FeedbackManagement
    }
});

export default store
