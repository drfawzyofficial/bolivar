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
      <div v-if="feedbacks.length <= 0" class="col-12">
        <div class="alert alert-danger">
          لا يوجد أي تقييمات من المستخدمين حتى الآن
        </div>
      </div>
      <div v-if="feedbacks.length > 0" class="col-12">
        <div class="deleteAllFeedbacks">
          <button
            type="submit"
            class="btn btn-danger waves-effect waves-light"
            @click="confirmDeleteAllFeedbacks()"
          >
            حذف جميع التقييمات
          </button>
        </div>
      </div>
       

      <div
        class="col-md-6 mt-3"
        v-for="(feedback, index) in feedbacks"
        :key="index"
      >
      <transition name="fade">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">
              التقييم المُعرف بـ {{ feedback._id }}
            </h3>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="name d-flex">
                  <h5>اسم العميل: </h5>
                  <p class="mb-0">{{ feedback.name }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="name d-flex">
                  <h5>الهاتف: </h5>
                  <p class="mb-0">{{ feedback.phone }}</p>
                </div>
              </div>
              <div class="col-12 mt-2">
                <div class="comment" style="background-color: #e9f3fb; padding: 0.5rem;">
                  <h5>التعليق</h5>
                  <p class="mb-0">{{ feedback.comment }}</p>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>جودة الطعام</h5>
                  <star-rating
                    :rating="feedback.foodQuality.score"
                    :star-size="20"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>مكان النظافة</h5>
                  <star-rating
                    :rating="feedback.placeCleanliness.score"
                    :star-size="23"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>سرعة الخدمة</h5>
                  <star-rating
                    :rating="feedback.serviceSpeed.score"
                    :star-size="23"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>جودة التطبيق</h5>
                  <star-rating
                    :rating="feedback.appExperience.score"
                    :star-size="23"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>الخبرة العامة</h5>
                  <star-rating
                    :rating="feedback.overallExperience.score"
                    :star-size="23"
                  ></star-rating>
                </div>
              </div>
            </div>
            <hr />
            <div class="form-group mb-0 mt-3">
              <div>
                <button
                  type="submit"
                  class="btn btn-danger waves-effect waves-light"
                  @click="deleteFeedbackC(feedback._id)"
                >
                  حذف التقييم
                </button>
                <router-link class="btn btn-warning ml-1"  :to="{ name: 'feedbackShow', params: { feedbackId: feedback._id } }">عرض التقييم</router-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
      title: "جميع الأراء من المستخدمين",
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
          text: "تقييمات",
          active: true,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      feedbacks: (state) => state.FeedbackManagement.feedbacks,
      Alert: (state) => state.Alert,
      loading: (state) => state.FeedbackManagement.loading,
    }),
  },
  methods: {
    successmsg() {
      Swal.fire("Good job!", "You clicked the button!", "error");
    },
    ...mapActions("FeedbackManagement", {
      deleteFeedback: "deleteFeedback",
      deleteAllFeedbacks: "deleteAllFeedbacks",
    }),
    async deleteFeedbackC(feedbackId) {
      const res = await this.deleteFeedback({ feedbackId });
      if (res.status === true) {
        Swal.fire({
          title: "حالة حذف التقييم",
          text: res.message,
          type: "success",
          confirmButtonText: "حسنًا موافق",
          closeOnConfirm: false,
        });
      } else {
        Swal.fire(res.message, "حسنًا تفهمت", "error");
      }
    },
    confirmDeleteAllFeedbacks() {
      Swal.fire({
        title: "هل أنتَ متأكد في مسح جميع التقييمات",
        text: "لن يكون لك القدرة على استرجاع التقييمات إن تم حذفها",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "تأكيد الحذف",
        cancelButtonText: "إغلاق",
      }).then(async (result) => {
        if (result.value) {
          const res = await this.deleteAllFeedbacks();
          if (res.status === true) {
            Swal.fire({
              title: "حالة حذف جميع التقييمات",
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
  },
  async created() {
    // reset login status
    // await this.$store.dispatch("FeedbackManagement/addFeedback");
    const res = await this.$store.dispatch("FeedbackManagement/getFeedbacks");
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  .fade-leave-active {
  opacity: 0;
}
</style>
