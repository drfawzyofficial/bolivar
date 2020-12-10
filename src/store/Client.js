import { Client } from "../services";

const initialState = { clients: [], loading: false }


export const ClientManagement = {
  namespaced: true,
  state: initialState,
  actions: {
    async addClient({ commit, dispatch }) {
      try {
        const data = await Client.addClient();
        console.log(data)
        if (data.statusCode === 200) {
          commit("addClient", data.result);
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
    async deleteClient({ commit }, { clientID }) {

        try {
            const data = await Client.deleteClient(clientID);
            if (data.statusCode === 200) {
                commit('deleteClient', clientID);
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
    async getAllClients({ commit }) { 
      try {
        commit('loading');
        const data = await Client.getAllClients();
        commit('unloading');
        if (data.statusCode === 200) {
          commit("getAllClients", data.result);
          return { status: true, message: data.message };
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
    async deleteAllClients({ commit }) {
        try {
            await Client.deleteAllClients();
            commit('deleteAllClients');
            return { status: true, message: 'تم مسح جميع البيانات' }
        } catch (err) {
            console.log(err)
        }
    },
  },
  mutations: {
    addClient(state, client) {
        state.clients.push(client)
    },
    getAllClients(state, clients) {
        state.clients = clients;
    },
    deleteAllClients(state) {
        state.clients = [];
    },
    deleteClient(state, clientID) {
        state.clients = state.clients.filter((client) => {
            return client._id != clientID;
        });
    },
    loading(state) {
      state.loading = true;
    },
    unloading(state) {
      state.loading = false;
    }
  },
};
