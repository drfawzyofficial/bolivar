import Vue from 'vue';
import Vuex from 'vuex';

import { Auth } from './Auth';
import { Alert } from './Alert';
import { FeedbackManagement } from './Feedback';
import { ClientManagement } from './Client';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        Auth,
        Alert,
        FeedbackManagement,
        ClientManagement
    }
});

export default store
