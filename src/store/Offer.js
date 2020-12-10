import { Offer } from "../services";

const initialState = { offers: [], loading: false }


export const OfferManagement = {
    namespaced: true,
    state: initialState,
    actions: {

        async getAllOffers({ commit }) {
            try {
                commit('loading');
                const data = await Offer.getAllOffers();
                commit('unloading');
                if (data.statusCode === 200) {
                    commit("getAllOffers", data.result);
                } else {
                    if (data.statusCode === 401 || data.statusCode === 500) {
                        this.logout();
                    } else {
                        return { status: false, message: data.message };
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        async addOffer({ commit }, { name, description, oldPrice, newPrice }) {
            try {
                const data = await Offer.addOffer(name, description, oldPrice, newPrice);
                if (data.statusCode === 200) {
                    commit("addOffer", data.result);
                    return { status: true, message: 'تم إضافة العرض بنجاح' };
                } else {
                    if (data.statusCode === 401 || data.statusCode === 500) {
                        this.logout();
                    } else {
                        return { status: false, message: data.message };
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        async editOffer({ commit }, { offerId, name, description, oldPrice, newPrice  }) {
            try {
                const data = await Offer.editOffer( offerId, name, description, oldPrice, newPrice);
                if (data.statusCode === 200) {
                    commit("editOffer", data.result);
                    return { status: true, message: 'تم تعديل العرض بنجاح' };
                } else {
                    if (data.statusCode === 401 || data.statusCode === 500) {
                        this.logout();
                    } else {
                        return { status: false, message: data.message };
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        },

        async deleteOffer({ commit }, { offerId }) {

            try {
                const data = await Offer.deleteOffer(offerId);
                if (data.statusCode === 200) {
                    commit('deleteOffer', offerId);
                    return { status: true, message: 'تم حذف العرض بنجاح' };
                } else {
                    if (data.statusCode === 401 || data.statusCode === 500) {
                        dispatch('Auth/logout', { root: true });
                    } else return { status: false, message: data.message };
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        async deleteAllOffers({ commit }) {
            try {
                await Offer.deleteAllOffers();
                commit('deleteAllOffers');
                return { status: true, message: 'تم مسح جميع البيانات' }
            } catch (err) {
                console.log(err)
            }
        },
    },
    mutations: {
        addOffer(state, offer) {
            state.offers.push(offer)
        },

        getAllOffers(state, offers) {
            state.offers = offers;
        },
        deleteAllOffers(state) {
            state.offers = [];
        },
        deleteOffer(state, offerId) {
            state.offers = state.offers.filter((offer) => {
                return offer._id !== offerId;
            });
        },
        editOffer(state, offer) {
            const foundIndex = state.offers.findIndex(x => x._id == offer._id);
            state.offers[foundIndex] = offer;
        },
        loading(state) {
            state.loading = true;
        },
        unloading(state) {
            state.loading = false;
        }
    },
};
