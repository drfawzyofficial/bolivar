<template>
  <Layout>
    <PageHeader />
    <div class="row py-5" v-if="loading">
      <div class="col-12 py-5">
        <div class="loading text-center text-dark">
          <div class="loading"  style="font-size: 3rem">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
           <div class="text"><h3>تحميل البيانات...</h3></div>
        </div>
      </div>
    </div>
    <div v-else>
      <b-container fluid>
      <b-row>
        <b-col lg="12">
          <div class="mb-2">
            <b-button v-b-modal.modal-1>إضافة مسئول</b-button>
            <b-modal id="modal-1" title="إضافة مسئول"  @ok="handleOk"  @show="resetInfoModal"
     ok-title = "إضافة مسئول" cancel-title = "إغلاق">
              <p class="mb-0">قم بإضافة المسئول سواء كان أدمن أو كاشير</p>
              <form class="addRes row">
                <b-col md="12" class="mt-3">
                  <b-input-group prepend="الاسم الأول">
                    <b-form-input
                      id="input-1"
                      v-model="firstName"
                      type="text"
                      required
                      placeholder="أدخل الأسم الأول"
                    ></b-form-input>
                    <b-input-group-append> </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col md="12" class="mt-3">
                  <b-input-group prepend="الاسم الثاني">
                    <b-form-input
                      id="input-2"
                      v-model="lastName"
                      type="text"
                      required
                      placeholder="أدخل الأسم الثاني"
                    ></b-form-input>
                    <b-input-group-append> </b-input-group-append>
                  </b-input-group>
                </b-col>
                 <b-col md="12" class="mt-3">
                  <b-input-group prepend="اسم المستخدم">
                    <b-form-input
                      id="input-3"
                      v-model="username"
                      type="text"
                      required
                      placeholder="أدخل اسم المستخدم"
                    ></b-form-input>
                    <b-input-group-append> </b-input-group-append>
                  </b-input-group>
                </b-col>
                 <b-col md="12" class="mt-3">
                  <b-input-group prepend="كلمة السر">
                    <b-form-input
                      id="input-4"
                      v-model="password"
                      type="password"
                      required
                      placeholder="أدخل كلمة السر"
                    ></b-form-input>
                    <b-input-group-append> </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col md="12" class="mt-3">
                     <b-input-group prepend="اختر الدور">
                        <b-form-select v-model="role" :options="options"></b-form-select>
                         <b-input-group-append> </b-input-group-append>
                     </b-input-group>
                </b-col>
              </form>
            </b-modal>
          </div>
        </b-col>
        <b-col lg="12" class="d-flex">
          <b-form-group
            label="فلترة النتائج"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="lg"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="lg">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="إبحث عن صف"
                size="lg"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >مسح</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-3">
          <b-pagination
            v-model="currentPage"
            :total-rows="Auth.Admins.length"
            :per-page="perPage"
            align="fill"
            class="my-0"
            size="lg"
            pills
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        class="bg-white shadow-sm text-center"
        responsive
        hover
        show-empty
        bordered
        stacked="lg"
        :items="Auth.Admins"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template #cell(actions)="row">
          <b-button
            @click="infoModal(row.item, row.index, $event.target)"
            variant="success"
          >
            تعديل
          </b-button>
          <b-button
            class="ml-2"
            @click="handleDeleteUser(row.item, row.index, $event.target)"
            variant="danger"
          >
            حذف
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        id="Modal"
        :title="title"
        ok-title = "تعديل"
        cancel-title="إغلاق"
        @ok="handleEdit"
      >
         <p>قم بإضافة المسئول سواء كان أدمن أو كاشير</p>
        <form class="addRes row">
              <b-col md="12">
                <b-input-group prepend="الاسم الأول">
                  <b-form-input
                    id="input-1"
                    v-model="firstName"
                    type="text"
                    required
                    placeholder="أدخل الأسم الأول"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="12" class="mt-3">
                <b-input-group prepend="الاسم الثاني">
                  <b-form-input
                    id="input-2"
                    v-model="lastName"
                    type="text"
                    required
                    placeholder="أدخل الأسم الثاني"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
                <b-col md="12" class="mt-3">
                <b-input-group prepend="اسم المستخدم">
                  <b-form-input
                    id="input-3"
                    v-model="username"
                    type="text"
                    required
                    placeholder="أدخل اسم المستخدم"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
                <b-col md="12" class="mt-3">
                <b-input-group prepend="كلمة السر">
                  <b-form-input
                    id="input-4"
                    v-model="password"
                    type="password"
                    required
                    placeholder="أدخل كلمة السر"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="12" class="mt-3">
                    <b-input-group prepend="اختر الدور">
                      <b-form-select v-model="role" :options="options"></b-form-select>
                        <b-input-group-append> </b-input-group-append>
                    </b-input-group>
              </b-col>
              </form>
      </b-modal>
    </b-container>
    </div>
  </Layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import StarRating from "vue-star-rating";
import Swal from "sweetalert2";
import Layout from "../Layouts/vertical";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
export default {
  components: { StarRating, Layout, PageHeader },
  data() {
    return {
         role: null,
         options: [
          { value: null, text: 'إختر الدور' },
          { value: 'Admin', text: 'أدمن مسئول' },
          { value: 'Cashier', text: 'كاشير مسئول' },
        ],
        firstName: 'fawzy',
        lastName: 'Ghanem',
        username: 'fawzyeltop',
        password: '0120975049',
        _id: '252525',
        title: 'modal',
      fields: [
        {
          key: "_id",
          label: "الرقم التعريفي",
        },
        {
          key: "firstName",
          label: "الاسم الأول",
        },
        {
          key: "lastName",
          label: "الاسم الثاني",
        },
        {
          key: "username",
          label: "اسم المستخدم",
        },
        {
          key: "role",
          label: "الدور",
        },
        { key: "actions", label: "إتخاذ قرار" },
      ],
      currentPage: 1,
      perPage: 5,
      filter: null,
      filterOn: []
    };
  },
  computed: {
    ...mapState({
      Auth: (state) => state.Auth,
      loading: (state) => state.Auth.loading,
    }),
  },
  mounted() {},
  async created() {
    await this.$store.dispatch("Auth/getAllUsers",);
  },
  methods: {
    ...mapActions('Auth', {
      addUser: 'addUser',
      deleteUser: 'deleteUser',
      editUser: 'editUser'
    }),
    async handleOk(bvModalEvt) {
         bvModalEvt.preventDefault();
        const { firstName, lastName, username, password, role } = this;
        const res = await this.addUser({ firstName, lastName, username, password, role });
        if (res.status === true) {
            Swal.fire({
            title: "إضافة الأدمن/الكاشير",
            text: res.message,
            type: "success",
            confirmButtonText: "حسنًا موافق",
            closeOnConfirm: false,
            });
      } else {
           Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
     async handleEdit(bvModalEvt) {
         bvModalEvt.preventDefault();
        const { _id, firstName, lastName, username, password, role } = this;
        const res = await this.editUser({ _id, firstName, lastName, username, password, role });
        if (res.status === true) {
            Swal.fire({
            title: "تعديل بيانات المستخدم",
            text: res.message,
            type: "success",
            confirmButtonText: "حسنًا موافق",
            closeOnConfirm: false,
            });
      } else {
           Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
     async handleDeleteUser(item, index, button) {
       Swal.fire({
        title: "هل أنتَ متأكد من حذف ذلك المستخدم",
        text: "لن يكون لك القدرة على استرجاع المستخدم إن تم حذفه",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "تأكيد الحذف",
        cancelButtonText: "إغلاق",
      }).then(async (result) => {
        if (result.value) {
          const res = await this.deleteUser({ _id: item._id });
          if (res.status === true) {
            Swal.fire({
              title: "تم حذف ذلك المستخدم",
              text: res.message,
              type: "success",
              confirmButtonText: "حسنًا موافق",
              closeOnConfirm: false,
            });
          } else {
            Swal.fire(res.message, "حسنًا تفهمت", "error");
          }
        }
      });
    },
    infoModal(item, index, button) {
      this.title = `بيانات المسئول ${ item.username }`;
      this._id = item._id;
      this.firstName = item.firstName;
      this.lastName = item.lastName;
      this.username = item.username;
      this.password = '';
      this.lastName = item.lastName;
      this.role = item.role;
      this.$root.$emit("bv::show::modal", 'Modal', button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this._id = ""
      this.firstName = "";
      this.lastName = "";
      this.username = "";
      this.password = "";
      this.role = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to .fade-leave-active {
  opacity: 0;
}
</style>
