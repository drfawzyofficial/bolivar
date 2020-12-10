import { Table } from "../services";

const initialState = { tables: [], loading: false }


export const TableManagement = {
  namespaced: true,
  state: initialState,
  actions: {
    async getAllTables({ commit }) { 
        try {
          commit('loading');
          const data = await Table.getAllTables();
          commit('unloading');
          if (data.statusCode === 200) {
            commit("getAllTables", data.result);
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
    async addTable({ commit }, { number }) {
      try {
        const data = await Table.addTable(number);
        if (data.statusCode === 200) {
          commit("addTable", data.result);
          return { status: true, message: 'تم إضافة المقعد بنجاح' };
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
    async deleteTable({ commit }, { tableId }) {

        try {
            const data = await Table.deleteTable(tableId);
            console.log(data);
            if (data.statusCode === 200) {
                commit('deleteTable', tableId);
                return { status: true, message: 'تم حذف المقعد بنجاح' };
            } else {
                if (data.statusCode === 401 || data.statusCode === 500) {
                    dispatch('Auth/logout', { root: true });
                } else return { status: false, message: data.message };
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    async editTable({ commit }, { tableId, number }) {

        try {
            console.log(number)
            const data = await Table.editTable(tableId, number);
            console.log(data);
            if (data.statusCode === 200) {
                commit('editTable', tableId);
                return { status: true, message: 'تم تعديل المقعد بنجاح' };
            } else {
                if (data.statusCode === 401 || data.statusCode === 500) {
                    dispatch('Auth/logout', { root: true });
                } else return { status: false, message: data.message };
            }
        } catch (err) {
            console.log(err.message);
        }
    },

    async deleteAllTables({ commit }) {
        try {
            await Table.deleteAllTables()
            commit('deleteAllTables'); 
            return { status: true, message: 'تم مسح جميع البيانات' }
        } catch (err) {
            console.log(err)
        }
    },
  },
  mutations: {
    addTable(state, table) {
        state.tables.push(table)
    },
    getAllTables(state, tables) {
        state.tables = tables;
    },
    deleteAllTables(state) {
        state.tables = [];
    },
    deleteTable(state, tableId) {
        state.tables = state.tables.filter((table) => {
            return table._id !== tableId;
        });
    },
    editTable(state, table) {
        const foundIndex = state.tables.findIndex(x => x.id == table._id);
        state.tables[foundIndex] = table;
      },
      loading(state) {
        state.loading = true;
      },
      unloading(state) {
        state.loading = false;
      }
  },
};
