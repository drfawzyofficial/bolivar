<template>
  <Layout>
    <PageHeader />
    <b-container fluid>
      <b-row>
        <b-col lg="12">
          <div class="mb-2">
            <b-button v-b-modal.modal-1>إضافة مسئول</b-button>
            <b-modal id="modal-1" title="إضافة مسئول"  @ok="handleOk"  @show="resetModal"
      @hidden="resetModal" ok-title = "إضافة مسئول" cancel-title = "إغلاق">
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
            @click="info(row.item, row.index, $event.target)"
            variant="success"
          >
            تعديل
          </b-button>
          <b-button
            class="ml-2"
            @click="deleteRow(row.item, row.index, $event.target)"
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
        :id="infoModal.id"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>
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
          { value: 'admin', text: 'أدمن مسئول' },
          { value: 'cashier', text: 'كاشير مسئول' },
        ],
        firstName: 'fawzy',
        lastName: 'Ghanem',
        username: 'fawzyeltop',
        password: '0120975049',
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
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState({
      Auth: (state) => state.Auth,
    }),
  },
  mounted() {},
  async created() {
    await this.$store.dispatch("Auth/getAllUsers",);
  },
  methods: {
    ...mapActions('Auth', {
      addUser: 'addUser'
    }),
    async handleOk(bvModalEvt) {
         bvModalEvt.preventDefault();
        const { firstName, lastName, username, password, role } = this;
        const res = await this.addUser({ firstName, lastName, username, password, role });
        if (res.status === true) {
            this.$bvModal.hide('modal-1');
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
    resetModal() {
        this.firstName = ''
        this.lastName = null
        this.username = null
        this.password = null
        this.selected = null
    },
    info(item, index, button) {
      this.infoModal.title = `الصف ${index + 1}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
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
