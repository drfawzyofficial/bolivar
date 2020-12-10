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
        <div class="alert alert-dark">
          <span>هنا جميع الوجبات الخاصة بـ {{ clas.arabicName }} </span>
           <b-button v-b-modal.modal-1 variant="primary" class="btn-sm">إضافة وجبة</b-button>
          <b-modal
            id="modal-1"
            title="إضافة صنف"
            @ok="handleAddMealC"
            ok-title="إضافة وجبة"
            cancel-title="إغلاق"
            @show="resetInfoModal"
          >
            <p class="mb-0">قم بإضافة وجبة الآن</p>
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
                <b-form inline>
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="small"
                    placeholder="سعر الصغير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="mid"
                    placeholder="سعر المتوسط"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                       class="w-25"
                       v-model="big"
                    placeholder="سعر الكبير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                      class="w-25"
                      v-model="family"
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
            :total-rows="clas.meals.length"
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
        :items="clas.meals"
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
            @click="handleDeleteMeal(row.item, row.index, $event.target)"
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
        @ok="handleEditMeal"
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
                <b-form inline>
                  <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="small"
                    placeholder="سعر الصغير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                    class="w-25"
                    v-model="mid"
                    placeholder="سعر المتوسط"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                       class="w-25"
                       v-model="big"
                    placeholder="سعر الكبير"
                  ></b-form-input>
                   <b-form-input
                    id="inline-form-input-name"
                      class="w-25"
                      v-model="family"
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
      small: '',
      mid: '',
      big: '',
      family: '',
      title: "صنف وجبات",
      name: '',
      description: '',
      price: [],
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
          key: "price",
          label: "السعر",
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
      clas: (state) => state.ClassManagement.clas,
      loading: (state) => state.ClassManagement.loading
    }),
  },
  methods: {
   infoModal(item, index, button) {
      this._id = item._id;
      this.name = item.name;
      this.description = item.description;
      this.small = item.price[0];
      this.mid =  item.price[1];
      this.big = item.price[2];
      this.family = item.price[3];
      this.$root.$emit("bv::show::modal", 'Modal', button);
    },
      resetInfoModal() {
        this.name = '';
        this.description = '';
        this.small = ''; 
        this.mid = ''; 
        this.big = '';
        this.family = '';
        this.price = [];
    },
    successmsg() {
      Swal.fire("Good job!", "You clicked the button!", "error");
    },
    ...mapActions("ClassManagement", {
      addMeal: 'addMeal',
      deleteMeal: 'deleteMeal',
      showClass: 'showClass',
      editMeal: 'editMeal'
    }),
      async handleDeleteMeal(item, index, button) {   
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
          const res = await this.deleteMeal({ classId: this.clas._id, mealId: item._id });
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
       const response = await fetch(`https://bolivar1.herokuapp.com/api/menu/addImage/${ item._id }`, requestOptions);
       const data = await response.json(); 
       if(data.statusCode === 200) {
        Swal.fire("حالة تحميل الصورة", "تم تحميل الصورة بنجاح", "success");
       } else Swal.fire("حالة تحميل الصورة", "لم يتم تحميل الصورة ", "error");
        } catch(err) {
          console.log(err.message)
        }
      
    },
     async handleAddMealC(bvModalEvt) {
         bvModalEvt.preventDefault();
        this.price = [this.small, this.mid, this.big, this.family];
        const { price, name, description } = this;
        const res = await this.addMeal({ classId: this.clas._id, name, description, price });
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
    async handleEditMeal(bvModalEvt) {
        bvModalEvt.preventDefault();
         this.price = [this.small, this.mid, this.big, this.family];
        const { price, name, description } = this;
        const res = await this.editMeal({ mealId: this._id, name, description, price });
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
     async deleteClassC(classId) {
      const res = await this.deleteClass({ classId });
      if (res.status === true) {
        Swal.fire({
          title: "حالة حذف الصنف",
          text: res.message,
          type: "success",
          confirmButtonText: "حسنًا موافق",
          closeOnConfirm: false,
        });
      } else {
        Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  async created() {
    
    const className = this.$route.params.className;
    const res = await this.showClass({ className })
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
