import { Class } from "../services";

const initialState = { classes: [], clas: { }, loading: false }


export const ClassManagement = {
  namespaced: true,
  state: initialState,
  actions: {
    async showClass({ commit }, { className }) { 
        try {
          commit('loading');
          const data = await Class.showClass(className);
          commit('unloading');
          if (data.statusCode === 200) {
            commit("showClass", data.result);
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
      async uploadImage({ commit }, { classId, formData }) { 
        try {
          console.log(classId, formData);
          const data = await Class.uploadImage(classId, formData);
          console.log(data)
          if (data.statusCode === 200) {
            // commit("uploadImage", data.result);
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
    async getAllClasses({ commit }) { 
        try {
          commit('loading');
          const data = await Class.getAllClasses();
          commit('unloading');
          if (data.statusCode === 200) {
            commit("getAllClasses", data.result);
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
    async addClass({ commit }, { englishName, arabicName }) {
      try {
        const data = await Class.addClass(englishName, arabicName);
        if (data.statusCode === 200) {
          commit("addClass", data.result);
          return { status: true, message: 'تم إضافة الصنف بنجاح' };
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
    async addMeal({ commit }, { classId, name, description, price }) {
        try {
          console.log(price)
          const data = await Class.addMeal(classId, name, description, price);
          if (data.statusCode === 200) {
            commit("addMeal", data.result);
            return { status: true, message: 'تم إضافة الوجبة بنجاح' };
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
    async editClass({ commit }, { _id, englishName, arabicName }) {
        try {
          const data = await Class.editClass(_id, englishName, arabicName);
          console.log(data.result);
          if (data.statusCode === 200) {
            commit("editClass", data.result);
            return { status: true, message: 'تم تعديل الصنف بنجاح' };
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
      async editMeal({ commit }, {mealId, name, description, price }) {
        try {
          const data = await Class.editMeal(mealId, name, description, price);
          if (data.statusCode === 200) {
            commit("editMeal", data.result);
            return { status: true, message: 'تم تعديل الوجبة بنجاح' };
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
    async deleteClass({ commit }, { classId }) {

        try {
            const data = await Class.deleteClass(classId);
            if (data.statusCode === 200) {
                commit('deleteClass', classId);
                return { status: true, message: 'تم حذف الصنف بنجاح' };
            } else {
                if (data.statusCode === 401 || data.statusCode === 500) {
                    dispatch('Auth/logout', { root: true });
                } else return { status: false, message: data.message };
            }
        } catch (err) {
            console.log(err.message);
        }
    },
    async deleteMeal({ commit }, { classId, mealId }) {

      try {
          const data = await Class.deleteMeal(classId, mealId);
          if (data.statusCode === 200) {
              commit('deleteMeal', mealId);
              return { status: true, message: 'تم حذف الوجبة بنجاح' };
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

    async deleteAllClasses({ commit }) {
        try {
            await Class.deleteAllClasses();
            commit('deleteAllClasses'); 
            return { status: true, message: 'تم مسح جميع البيانات' }
        } catch (err) {
            console.log(err)
        }
    },
  },
  mutations: {
    addClass(state, classA) {
        state.classes.push(classA)
    },
    addMeal(state, meal) {
        state.clas.meals.push(meal)
    },
    getAllClasses(state, classes) {
        state.classes = classes;
    },
    deleteAllClasses(state) {
        state.classes = [];
    },
    deleteClass(state, classId) {
        state.classes = state.classes.filter((clas) => {
            return clas._id !== classId;
        });
    },
    deleteMeal(state, mealId) {
      const meals = state.clas.meals;
      var filtered = meals.filter(function(el) { return el._id != mealId }); 
      state.clas.meals = filtered;
  },
    editClass(state, clas) {
        const foundIndex = state.classes.findIndex(x => x._id == clas._id);
        state.classes[foundIndex] = clas;
      },
      editMeal(state, meal) {
        const foundIndex = state.classes.findIndex(x => x._id == meal._id);
        state.classes[foundIndex] = meal;
      },
      showClass(state, clas) {
           state.clas = clas;
      },
      loading(state) {
        state.loading = true;
      },
      unloading(state) {
        state.loading = false;
      }
  },
};
