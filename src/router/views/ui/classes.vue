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
        <div class="btn-ContentF">
           <b-button v-b-modal.modal-1 class="btn-lg btn btn-primary">إضافة صنف</b-button>
          <b-modal
            id="modal-1"
            title="إضافة صنف"
            @ok="handleAddClass"
            ok-title="إضافة صنف"
            cancel-title="إغلاق"
            @show="resetInfoModal"
          >
            <p class="mb-0">قم بإضافة صنف الآن</p>
            <form class="addRes row">
              <b-col md="12" class="mt-3">
                <b-input-group prepend="اسم الصنف بالعربية">
                  <b-form-input
                    id="input-4"
                    v-model="arabicName"
                    type="text"
                    required
                    placeholder="اسم الصنف بالعربية"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
               <b-col md="12" class="mt-3">
                <b-input-group prepend="اسم الصنف بالإنجليزية">
                  <b-form-input
                    id="input-4"
                    v-model="englishName"
                    type="text"
                    required
                    placeholder="اسم الصنف بالإنجليزية"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
            </form>
          </b-modal>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(clas, index) in classes" :key="index"
        class="col-lg-6 col-xl-3"
      >

      <div class="card shadow-lg border">
         <img class="card-img-top" :src="clas.image" alt="Card image cap" v-if="clas.image" style="width:100%; height: 150px">
        <div class="card-body">
          <h5 class="card-title">صنف {{ clas.arabicName }}</h5>
          <p class="card-text"> صنف الـ {{ clas.arabicName }} بعدد وجبات {{ clas.meals.length }}</p>
          <div class="btns d-flex justify-content-around">
             <button class="btn btn-danger" @click="deleteClassC(clas._id)">حذف</button>
             <button class="btn btn-primary" @click="infoModal(clas._id, clas.englishName, clas.arabicName, $event.target)">تعديل </button>
             <router-link tag="button" class="btn btn-warning" :to="{ path: `/class/${clas.englishName}` }">زيارة</router-link>
          </div>
          <div class="mt-2">
              <b-form-file accept="image/*" @change="handleUploadImage(clas._id, $event)" id="file-default"></b-form-file>
          </div>
        </div>
      </div>
      </div>
    </div>
    <!-- Info modal -->
      <b-modal
        id="Modal"
        :title="title"
        ok-title = "تعديل"
        cancel-title="إغلاق"
        @ok="handleEditClassC"
      >
          <p class="mb-0">قم بتعديل الصنف الآن</p>
        <form class="addRes row">
              <b-col md="12" class="mt-3">
                <b-input-group prepend="اسم الصنف بالعربية">
                  <b-form-input
                    id="input-4"
                    v-model="arabicName"
                    type="text"
                    required
                    placeholder="اسم الصنف بالعربية"
                  ></b-form-input>
                  <b-input-group-append> </b-input-group-append>
                </b-input-group>
              </b-col>
               <b-col md="12" class="mt-3">
                <b-input-group prepend="اسم الصنف بالإنجليزية">
                  <b-form-input
                    id="input-4"
                    v-model="englishName"
                    type="text"
                    required
                    placeholder="اسم الصنف بالإنجليزية"
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
/**
 * Rating component
 */
export default {
  page: {
    title: "Classes",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { StarRating, Layout, PageHeader }, 
  data() {
    return {
      _id: '',
      arabicName: '',
      englishName: '',
      title: "جميع التصنيفات المسجلة بالمطعم",
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
      loading: (state) => state.ClassManagement.loading,
      classes: (state) => state.ClassManagement.classes
    }),
  },
  methods: {
    
 
  
      resetInfoModal() {
        this.arabicName = '';
        this.englishName = '';
    },
    successmsg() {
      Swal.fire("Good job!", "You clicked the button!", "error");
    },
    ...mapActions("ClassManagement", {
      addClass: "addClass",
      deleteClass: "deleteClass",
      editClass: 'editClass',
      deleteAllClasses: 'deleteAllClasses',
    }),
     async handleUploadImage(classId, event) {
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
       const response = await fetch(`https://bolivar1.herokuapp.com/api/class/addImage/${ classId }`, requestOptions);
       const data = await response.json(); 
       if(data.statusCode === 200) {
        Swal.fire("حالة تحميل الصورة", "تم تحميل الصورة بنجاح", "success");
        setTimeout(() => {
          window.location.reload();
        }, 3000)
       } else Swal.fire("حالة تحميل الصورة", "لم يتم تحميل الصورة ", "error");
        } catch(err) {
          console.log(err.message)
        }
      
    },
     handleDeleteAllClasses() {
      Swal.fire({
        title: "هل أنتَ متأكد في مسح جميع التصنيفات",
        text: "لن يكون لك القدرة على استرجاع التصنيفات إن تم حذفها",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "تأكيد الحذف",
        cancelButtonText: "إغلاق",
      }).then(async (result) => {
        if (result.value) {
          const res = await this.deleteAllClasses();
          if (res.status === true) {
            Swal.fire({
              title: "حالة حذف جميع التصنيفات",
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
       async handleAddClass(bvModalEvt) {
         bvModalEvt.preventDefault();
        const { arabicName, englishName } = this;
        const res = await this.addClass({ arabicName, englishName});
        if (res.status === true) {
            Swal.fire({
            title: "إضافة صنف",
            text: res.message,
            type: "success",
            confirmButtonText: "حسنًا موافق",
            closeOnConfirm: false,
            });
      } else {
           Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
     async handleAddClassC(bvModalEvt) {
         bvModalEvt.preventDefault();
        const { arabicName, englishName } = this;
        const res = await this.addClass({ arabicName, englishName});
        if (res.status === true) {
            Swal.fire({
            title: "إضافة صنف",
            text: res.message,
            type: "success",
            confirmButtonText: "حسنًا موافق",
            closeOnConfirm: false,
            });
      } else {
           Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
     async handleEditClassC(bvModalEvt) {
         bvModalEvt.preventDefault();
        const { _id, englishName, arabicName } = this;
        const res = await this.editClass({ _id, englishName, arabicName });
        if (res.status === true) {
            Swal.fire({
            title: "تم التعديل بنجاح",
            text: res.message,
            type: "success",
            confirmButtonText: "حسنًا موافق",
            closeOnConfirm: false,
            });
      } else {
           Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
      infoModal(_id, englishName, arabicName, button) {
      this._id = _id;
      this.englishName = englishName;
      this.arabicName = arabicName;
      this.$root.$emit("bv::show::modal", 'Modal', button);
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
  },
  async created() {
    const res = await this.$store.dispatch("ClassManagement/getAllClasses");
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
