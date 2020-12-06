import { User } from "../services";
import router from "../router";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user, Admins: [], addRequest: false }
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
        const data = await User.getAllUsers();
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
        console.log(firstName, lastName, username, password, role);
        commit("addRequest");
        const data = await User.addUser(firstName, lastName, username, password, role);
        console.log(data)
        if (data.statusCode === 200) {
          commit("addUser", data.result);
          commit("addRequestSuccess", { username });
          return { status: true, message: data.message };
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
   
    logout(state) {
      state.status = {};
      state.user = null;
    },
  },
};
