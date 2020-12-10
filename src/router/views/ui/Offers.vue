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
    <div class="row">
      <div class="col-12">
        <div class="alert alert-warning mb-0">
          <strong>يمكنك حذف جميع العروض عن طريق الزر التالي </strong> <b-button @click="handleDeleteAllOffers" variant="danger" class="btn">حذف جميع العروض</b-button>
        </div>
        <div class="alert alert-dark">
           <strong>يمكنك إضافة عرض عن طريق الزر التالي </strong> <b-button v-b-modal.modal-1 variant="primary" class="btn">إضافة عرض</b-button>
          <b-modal
            id="modal-1"
            title="إضافة صنف"
            @ok="handleAddOffer"
            ok-title="إضافة وجبة"
            cancel-title="إغلاق"
            @show="resetInfoModal"
          >
            <p class="mb-0">قم بإضافة عرض الآن</p>
            <form class="addRes row">
              <b-col md="12" class="mt-3">
                <b-input-group prepend="اسم الوجبة">
                  <b-form-input
                    id="input-4"
                    v-model="name"
                    type="text"
                    required
                    placeholder="اسم الوجبة"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="12" class="mt-3">
                <b-input-group prepend="الوصف">
                  <b-form-textarea placeholder="صف الوجبة" v-model="description"></b-form-textarea>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="12" class="mt-3">
                <h5>السعر القديم</h5>
                <b-form inline>
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="osmall"
                    placeholder="سعر صغير "
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="omid"
                    placeholder="سعر المتوسط"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                       class="w-25"
                       v-model="obig"
                    placeholder="سعر الكبير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                      class="w-25"
                      v-model="ofamily"
                    placeholder="سعر العائلي"
                  ></b-form-input>
                </b-form>
              </b-col>
              <hr>
               <b-col md="12" class="mt-3">
                  <h5>السعر الجديد</h5>
                <b-form inline>
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="nsmall"
                    placeholder="سعر الصغير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="nmid"
                    placeholder="سعر المتوسط"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                       class="w-25"
                       v-model="nbig"
                    placeholder="سعر الكبير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                      class="w-25"
                      v-model="nfamily"
                    placeholder="سعر العائلي"
                  ></b-form-input>
                </b-form>
              </b-col>
            </form>
          </b-modal>
        </div>
          
      </div>
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
            :total-rows="offers.length"
            :per-page="perPage"
            align="fill"
            class="my-0"
            size="lg"
            pills
          ></b-pagination>
        </b-col>
    </div>
     <!-- Main table element -->
      <b-table
        class="bg-white shadow-sm text-center"
        responsive
        hover
        show-empty
        bordered
        stacked="lg"
        :items="offers"
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
            @click="handleDeleteOffer(row.item, row.index, $event.target)"
            variant="danger"
          >
            حذف
          </b-button>
          <b-form-file class="w-50 ml-2" accept="image/*" @change="handleUploadImage(row.item, row.index, $event)" id="file-default"></b-form-file>
        </template>
         <template #cell(image)="row">
              <img :src="row.item.image" style="height: 80px; width: 80px"/>
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
        title="تعديل الوجبة"
        ok-title = "تعديل"
        cancel-title="إغلاق"
        @ok="handleEditOffer"
      >
          <p class="mb-0">قم بتعديل الوجبة الآن</p>
           <form class="addRes row">
              <b-col md="12" class="mt-3">
                <b-input-group prepend="اسم الوجبة">
                  <b-form-input
                    id="input-4"
                    v-model="name"
                    type="text"
                    required
                    placeholder="اسم الوجبة"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="12" class="mt-3">
                <b-input-group prepend="الوصف">
                  <b-form-textarea placeholder="صف الوجبة" v-model="description"></b-form-textarea>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="12" class="mt-3">
                <h5>السعر القديم</h5>
                <b-form inline>
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="osmall"
                    placeholder="سعر صغير "
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="omid"
                    placeholder="سعر المتوسط"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                       class="w-25"
                       v-model="obig"
                    placeholder="سعر الكبير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                      class="w-25"
                      v-model="ofamily"
                    placeholder="سعر العائلي"
                  ></b-form-input>
                </b-form>
              </b-col>
              <hr>
               <b-col md="12" class="mt-3">
                  <h5>السعر الجديد</h5>
                <b-form inline>
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="nsmall"
                    placeholder="سعر الصغير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="nmid"
                    placeholder="سعر المتوسط"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                       class="w-25"
                       v-model="nbig"
                    placeholder="سعر الكبير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                      class="w-25"
                      v-model="nfamily"
                    placeholder="سعر العائلي"
                  ></b-form-input>
                </b-form>
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

/**
 * Rating component
 */
export default {
  page: {
    title: "Class",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { StarRating, Layout, PageHeader }, 
  data() {
    return {
      _id: '',
      osmall: '',
      omid: '',
      obig: '',
      ofamily: '',
      nsmall: '',
      nmid: '',
      nbig: '',
      nfamily: '',
      title: "كامل العروض",
      name: '',
      description: '',
      oldPrice: [],
      newPrice: [],
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
          text: "العروض",
          active: true,
        },
      ],
       fields: [
        {
          key: "_id",
          label: "الرقم التعريفي",
        },
        {
          key: "name",
          label: "اسم الوجبة",
        },
        {
          key: "description",
          label: "وصف الوجبة",
        },
         {
          key: "image",
          label: "الصورة",
        },
        {
          key: "oldPrice",
          label: "السعر القديم",
        },
         {
          key: "newPrice",
          label: "السعر الجديد",
        },
        { key: "actions", label: "إتخاذ قرار" },
      ],
      currentPage: 1,
      perPage: 10,
      filter: null,
      filterOn: []
    };
  },
  computed: {
    ...mapState({
      offers: (state) => state.OfferManagement.offers,
      loading: (state) => state.OfferManagement.loading
    }),
  },
  methods: {
   infoModal(item, index, button) {
      this._id = item._id;
      this.name = item.name;
      this.description = item.description;
      this.osmall = item.oldPrice[0];
      this.omid =  item.oldPrice[1];
      this.obig = item.oldPrice[2];
      this.ofamily = item.oldPrice[3];
      this.nsmall = item.newPrice[0];
      this.nmid =  item.newPrice[1];
      this.nbig = item.newPrice[2];
      this.nfamily = item.newPrice[3];
      this.$root.$emit("bv::show::modal", 'Modal', button);
    },
      resetInfoModal() {
        this.name = '';
        this.description = '';
        this.osmall = ''; 
        this.omid = ''; 
        this.obig = '';
        this.ofamily = '';
        this.oldPrice = [];
        this.nsmall = ''; 
        this.nmid = ''; 
        this.nbig = '';
        this.nfamily = '';
        this.newPrice = [];
    },

    ...mapActions("OfferManagement", {
      getAllOffers: 'getAllOffers',
       addOffer: 'addOffer',
      deleteAllOffers: 'deleteAllOffers',
      deleteOffer: 'deleteOffer',
      editOffer: 'editOffer'
    }),
       async handleAddOffer(bvModalEvt) {
         bvModalEvt.preventDefault();
        this.oldPrice = [this.osmall, this.omid, this.obig, this.ofamily];
        this.newPrice = [this.nsmall, this.nmid, this.nbig, this.nfamily];
        const { oldPrice, newPrice, name, description } = this;
        const res = await this.addOffer({ name, description, oldPrice, newPrice });
        if (res.status === true) {
            Swal.fire({
            title: "إضافة وجبة",
            text: res.message,
            type: "success",
            confirmButtonText: "حسنًا موافق",
            closeOnConfirm: false,
            });
      } else {
           Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
      async handleDeleteOffer(item, index, button) {   
       Swal.fire({
        title: "هل أنتَ متأكد من حذف تلك الوجبة",
        text: "لن يكون لك القدرة على استرجاع الوجبة إن تم حذفها",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "تأكيد الحذف",
        cancelButtonText: "إغلاق",
      }).then(async (result) => {
        if (result.value) {
          const res = await this.deleteOffer({ offerId: item._id });
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
     async handleUploadImage(item, index, event) {
        try {
          let formData = new FormData();
        formData.append('name', 'avatar');
        formData.append('upload', event.target.files[0]); 
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'PUT', 
            headers:  { 'Authorization': 'Bearer ' + user.token, 'Accept': 'application/json' },
            body: formData 
        }; 
        Swal.fire({
          title: "تحميل الصورة",
          text: "جارٍ تحميل الصورة",
          icon: 'warning',
          showCancelButton: false, 
          showConfirmButton: false
      })
       const response = await fetch(`https://bolivar1.herokuapp.com/api/offer/addImage/${ item._id }`, requestOptions);
       const data = await response.json(); 
       if(data.statusCode === 200) {
        Swal.fire("حالة تحميل الصورة", "تم تحميل الصورة بنجاح", "success");
       } else Swal.fire("حالة تحميل الصورة", "لم يتم تحميل الصورة ", "error");
        } catch(err) {
          console.log(err.message)
        }
      
    },
  
    async handleEditOffer(bvModalEvt) {
        bvModalEvt.preventDefault();
        this.oldPrice = [this.osmall, this.omid, this.obig, this.ofamily];
        this.newPrice = [this.nsmall, this.nmid, this.nbig, this.nfamily];
        const { oldPrice, newPrice, name, description } = this;
        const res = await this.editOffer({offerId: this._id, name, description, oldPrice, newPrice });
        if (res.status === true) {
            Swal.fire({
            title: "تعديل الوجبة",
            text: res.message,
            type: "success",
            confirmButtonText: "حسنًا موافق",
            closeOnConfirm: false,
            });
      } else {
           Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
      handleDeleteAllOffers() {
      Swal.fire({
        title: "هل أنتَ متأكد في مسح جميع العروض",
        text: "لن يكون لك القدرة على استرجاع العروض إن تم خذفها",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "تأكيد الحذف",
        cancelButtonText: "إغلاق",
      }).then(async (result) => {
        if (result.value) {
          const res = await this.deleteAllOffers();
          if (res.status === true) {
            Swal.fire({
              title: "حالة حذف جميع العروض",
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
    //  async deleteClassC(classId) {
    //   const res = await this.deleteClass({ classId });
    //   if (res.status === true) {
    //     Swal.fire({
    //       title: "حالة حذف الصنف",
    //       text: res.message,
    //       type: "success",
    //       confirmButtonText: "حسنًا موافق",
    //       closeOnConfirm: false,
    //     });
    //   } else {
    //     Swal.fire(res.message, "حسنًا تفهمت", "error");
    //   }
    // },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  async created() {
    await this.getAllOffers();
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
