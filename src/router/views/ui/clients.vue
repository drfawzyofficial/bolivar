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
          <p class="mb-0">يمكنك حذف جميع العملاء بالضغط على</p>
          <button type="button" class="btn btn-danger ml-1" @click="deleteAllClientsC">حذف جميع العملاء</button>
       </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(client, index) in clients"
        :key="index"
        class="col-lg-6 col-xl-3"
      >
        <!-- Simple card -->
        <b-card
          :img-src="
            require('@/assets/images/users/SJGKVE5UNVESVCW7BBOHKQCZVE.webp')
          "
          img-alt="Card image"
          img-top
        >
          <b-card-title>
            <h5 class="card-title">العميل</h5>
          </b-card-title>
          <b-card-text>
            العميل {{ client.name }} <br> برقم الهاتف {{ client.phone }}
          </b-card-text>
          <b-button @click="deleteClientC(client._id)" href="javascript:void(0);" variant="danger"
            >حذف العميل</b-button
          >
        </b-card>
      </div>
    </div>
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

/**
 * Rating component
 */
export default {
  page: {
    title: "Feedback",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { StarRating, Layout, PageHeader },
  data() {
    return {
      title: "جميع العملاء المسجلون بالمطعم",
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
          text: "العملاء",
          active: true,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      clients: (state) => state.ClientManagement.clients,
      loading: (state) => state.ClientManagement.loading
    }),
  },
  methods: {
    successmsg() {
      Swal.fire("Good job!", "You clicked the button!", "error");
    },
    ...mapActions("ClientManagement", {
      addClient: "addClient",
      getAllClients: "getAllClients",
      deleteAllClients: 'deleteAllClients',
      deleteClient: 'deleteClient'
    }),
      deleteAllClientsC() {
      Swal.fire({
        title: "هل أنتَ متأكد في مسح جميع العملاء",
        text: "لن يكون لك القدرة على استرجاع العملاء إن تم حذفهم",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "تأكيد الحذف",
        cancelButtonText: "إغلاق",
      }).then(async (result) => {
        if (result.value) {
          const res = await this.deleteAllClients();
          if (res.status === true) {
            Swal.fire({
              title: "حالة حذف جميع العملاء",
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
     async deleteClientC(clientID) {
      const res = await this.deleteClient({ clientID });
      if (res.status === true) {
        Swal.fire({
          title: "حالة حذف العميل",
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
    // await this.$store.dispatch("ClientManagement/addClient");
    const res = await this.$store.dispatch("ClientManagement/getAllClients");
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
