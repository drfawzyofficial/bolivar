<template>
  <Layout>
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
      <PageHeader :title="title" :items="items" />
    <div class="row mb-3">
      <div class="col-12">
        <div class="d-flex">
          <p class="mb-0">يمكنك حذف جميع المقاعد بالضغط على</p>
          <button type="button" class="btn btn-danger ml-1" @click="deleteAllTablesC">
            حذف جميع المقاعد
          </button>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <b-button v-b-modal.modal-1>إضافة مقعد</b-button>
      <b-modal
        id="modal-1"
        title="إضافة مقعد"
        @ok="handleAddTable"
        ok-title="إضافة مقعد"
        cancel-title="إغلاق"
        @show="resetInfoModal"
      >
        <p class="mb-0">قم بإضافة مقعد الآن</p>
        <form class="addRes row">
          <b-col md="12" class="mt-3">
            <b-input-group prepend="رقم المقعد">
              <b-form-input
                id="input-4"
                v-model="number"
                type="number"
                required
              ></b-form-input>
              <b-input-group-append> </b-input-group-append>
            </b-input-group>
          </b-col>
        </form>
      </b-modal>
    </div>

    <div class="row">
      <div
        class="col-xl-3 col-md-6"
        v-for="(table, index) in tables"
        :key="index"
      >
        <div class="card mini-stat bg-white shadow-lg text-dark">
          <div class="card-body">
            <div class="mb-4">
              <div class="float-left mini-stat-img mr-4">
                <img src="@/assets/images/services-icon/01.png" alt />
              </div>
              <h4 class="font-weight-medium font-size-24">
                {{ table.number }}
              </h4>
              <div class="mini-stat-label bg-warning">
                <p class="mb-0">المقعد {{ table.number }}</p>
              </div>
            </div>
            <div class="pt-2">
              <div class="float-righat text-center">
                <a href="javascript:void(0)" class="text-primary"  @click="infoModal(table._id, table.number, $event.target)">
              <i class="far fa-edit h3"></i>
                </a>
                <a href="javascript:void(0)" class="text-danger ml-3" @click="deleteTableC(table._id)">
              <i class="far fa-trash-alt h3"></i>
                </a>
              </div>
            </div>
           <div>
              <qrcode-vue class="text-center" :value="`${ String(table.number) }`" size="100" level="H"></qrcode-vue>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
        id="Modal"
        :title="title"
        ok-title = "تعديل"
        cancel-title="إغلاق"
        @ok="handleEditTable"
      >
         <p>قم بتعديل رقم الترابيزة</p>
       <form class="addRes row">
              <b-col md="12">
                <b-input-group prepend="رقم الترابيزة">
                  <b-form-input
                    id="input-1"
                    v-model="number"
                    type="number"
                    required
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
        </form>
      </b-modal>
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
import QrcodeVue from 'qrcode.vue'
/**
 * Rating component
 */
export default {
  page: {
    title: "Feedback",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { StarRating, Layout, PageHeader, QrcodeVue },
  data() {
    return {
      tableId: 0,
      img: require('@/assets/images/services-icon/01.png'),
      number: 0,
      title: "جميع المقاعد المسجلون بالمطعم",
      items: [
        {
          text: "لوحة التحكم",
          href: "/",
        },
        {
          text: "العناصر",
          href: "/",
        },
        {
          text: "المقاعد",
          active: true,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      tables: (state) => state.TableManagement.tables,
      loading: (state) => state.TableManagement.loading,
    }),
  },
  methods: {
    successmsg() {
      Swal.fire("Good job!", "You clicked the button!", "error");
    },
    ...mapActions("TableManagement", {
      addTable: "addTable",
      deleteTable: 'deleteTable',
      deleteAllTables: 'deleteAllTables',
      editTable: 'editTable'
    }),
    infoModal(tableId, number, button) {
       this.number = number;
       this.tableId = tableId;
       this.$root.$emit("bv::show::modal", 'Modal', button);
    },
     resetInfoModal() {
         this.number = 0
    },
    deleteAllTablesC() {
      Swal.fire({
        title: "هل أنتَ متأكد في مسح جميع المقاعد",
        text: "لن يكون لك القدرة على استرجاع المقاعد إن تم حذفها",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "تأكيد الحذف",
        cancelButtonText: "إغلاق",
      }).then(async (result) => {
        if (result.value) {
          const res = await this.deleteAllTables();
          if (res.status === true) {
            Swal.fire({
              title: "حالة حذف جميع المقاعد",
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
    async handleAddTable(bvModalEvt) {
      bvModalEvt.preventDefault();
      const number = this.number;
      const res = await this.addTable({ number });
      if (res.status === true) {
        Swal.fire({
          title: "إضافة مقعد",
          text: res.message,
          type: "success",
          confirmButtonText: "حسنًا موافق",
          closeOnConfirm: false,
        });
      } else {
        Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
    async handleEditTable(bvModalEvt) {
      bvModalEvt.preventDefault();
      const { tableId, number } = this;
      const res = await this.editTable({ tableId, number });
      if (res.status === true) {
        Swal.fire({
          title: "إضافة مقعد",
          text: res.message,
          type: "success",
          confirmButtonText: "حسنًا موافق",
          closeOnConfirm: false,
        });
      } else {
        Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
    async deleteTableC(tableId) {
      const res = await this.deleteTable({ tableId });
      if (res.status === true) {
        Swal.fire({
          title: "حالة حذف المقعد",
          text: res.message,
          type: "success",
          confirmButtonText: "حسنًا موافق",
          closeOnConfirm: false,
        });
      } else {
        Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
  },
  async created() {
    const res = await this.$store.dispatch("TableManagement/getAllTables");
    if (res.status === true) {
      Swal.fire({
        title: "حالة البيانات",
        text: "تم استرجاع جميع البيانات بشكل صحيح",
        type: "success",
        confirmButtonText: "حسنًا موافق",
        closeOnConfirm: false,
      });
    } else {
      Swal.fire(res.message, "حسنًا تفهمت", "error");
    }
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
