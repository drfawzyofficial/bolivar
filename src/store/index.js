import Vue from 'vue';
import Vuex from 'vuex';

import { Auth } from './Auth';
import { Alert } from './Alert';
import { FeedbackManagement } from './Feedback';
import { ClientManagement } from './Client';
import { TableManagement } from './Table';
import { ClassManagement } from './Class';
import { OfferManagement } from './Offer';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        Auth,
        Alert,
        FeedbackManagement,
        ClientManagement,
        TableManagement,
        ClassManagement,
        OfferManagement
    }
});

export default store
