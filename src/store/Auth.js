import { User } from "../services";
import router from "../router";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user, Admins: [], addRequest: false, loading: false }
  : { status: {}, user: null };

export const Auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ dispatch, commit }, { username, password }) {
      try {
        commit("loginRequest", { username });
        const data = await User.login(username, password);
        if (data.statusCode === 200) {
          const user = { token: data.result.token, user: data.result.user };
          localStorage.setItem("user", JSON.stringify(user));
          commit("loginSuccess", data.result.user);
          router.push("/");
        } else {
          if (data.statusCode === 401 || data.statusCode === 500) {
            this.logout();
          } else {
            commit("loginFailure", data.message);
            dispatch("Alert/error", data.message, { root: true });
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async getAllUsers({ dispatch, commit }) {
      try {
        commit('loading');
        const data = await User.getAllUsers();
        commit('unloading');
        if (data.statusCode === 200) {
          commit("getAllUsers", data.result);
        } else {
          if (data.statusCode === 401 || data.statusCode === 500) {
            this.logout();
          } else {
            commit("loginFailure", data.message);
            dispatch("Alert/error", data.message, { root: true });
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async addUser({ commit }, { firstName, lastName, username, password, role }) {
      try {
        commit("addRequest");
        const data = await User.addUser(firstName, lastName, username, password, role);
        if (data.statusCode === 200) {
          commit("addUser", data.result);
          commit("addRequestSuccess", { username });
          return { status: true, message: 'تم إضافة أدمن/كاشير بنجاح' };
        } else {
          if (data.statusCode === 401 || data.statusCode === 500) {
            this.logout();
          } else {
            commit("addRequestFailed", data.message);
            return { status: false, message: data.message };
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteUser({ commit }, { _id }) {
      try {
        const data = await User.deleteUser(_id);
        console.log(data)
        if (data.statusCode === 200) {
          commit("deleteUser", _id);
          return { status: true, message: 'تم حذف ذلك المستخدم' };
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
    async editUser({ commit }, { _id, firstName, lastName, username, password, role }) {
      try {
        const data = await User.editUser( _id, firstName, lastName, username, password, role);
        console.log(data) 
        if (data.statusCode === 200) {
          commit("editUser", data.result);
          return { status: true, message: 'تم تعديل البيانات بنجاح' };
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
    logout({ commit }) {
      User.logout();
      commit("logout");
      router.push("/login");
    },
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    getAllUsers(state, Admins) {
      state.Admins = Admins;
    },
    addRequest(state, user) {
      state.addRequest = true;
    },
    addRequestFailed(state) {
      state.addRequest = false;
    },
    addRequestSuccess(state, user) {
      state.addRequest = false;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    editUser(state, user) {
      const foundIndex = state.Admins.findIndex(x => x.id == user._id);
      state.Admins[foundIndex] = user;
    },
    addUser(state, user) {
      state.Admins.push(user);
    },
    deleteUser(state, userID) {
      state.Admins = state.Admins.filter((user) => {
        return user._id !== userID;
    });
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
    loading(state) {
      state.loading = true;
    },
    unloading(state) {
      state.loading = false;
    }
  },
};
