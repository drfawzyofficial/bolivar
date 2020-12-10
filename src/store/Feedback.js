import { Feedback } from '../services';

export const FeedbackManagement = {
    namespaced: true,
    state: { feedbacks: [], OneFeedback: { }, loading: false },
    actions: {
        async addFeedback({ dispatch, commit }) {
            try {
                const data = await Feedback.addFeedback();
                if (data.statusCode === 200) {
                    commit('addFeedback', data.result);
                } else {
                    if (data.statusCode === 401 || data.statusCode === 500) {
                        dispatch('Auth/logout', { root: true });
                    } else {
                        dispatch("Alert/error", data.message, { root: true });
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        async getFeedbacks({ commit }) {
            commit('loading');
            const data = await Feedback.getFeedbacks();
            commit('unloading');
            if (data.statusCode === 200) {
                commit('getFeedbacks', data.result);
                return { status: true, message: data.message };
            } else {
                if (data.statusCode === 401 || data.statusCode === 500) {
                    dispatch('Auth/logout', { root: true });
                } else return { status: false, message: data.message };
            }
        },
        async deleteFeedback({ commit }, { feedbackId }) {

            try {
                const data = await Feedback.deleteFeedback(feedbackId);
                if (data.statusCode === 200) {
                    commit('deleteFeedback', feedbackId);
                    return { status: true, message: data.message };
                } else {
                    if (data.statusCode === 401 || data.statusCode === 500) {
                        dispatch('Auth/logout', { root: true });
                    } else return { status: false, message: data.message };
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        async deleteAllFeedbacks({ commit }) {
            try {
                await Feedback.deleteAllFeedbacks();
                commit('deleteAllFeedbacks');
                return { status: true, message: 'تم مسح جميع البيانات' }
            } catch (err) {
                console.log(err)
            }
        },
    },
    mutations: {
        getFeedbacks(state, feedbacks) {
            state.feedbacks = feedbacks;
        },
        addFeedback(state, feedback) {
            state.feedbacks.push(feedback);
        },
        deleteFeedback(state, feedbackId) {
            state.feedbacks = state.feedbacks.filter((feedback) => {
                return feedback._id != feedbackId;
            });
        },
        deleteAllFeedbacks(state) {
            state.feedbacks = [];
        },
        loading(state) {
            state.loading = true;
          },
          unloading(state) {
            state.loading = false;
          }

    }
}
