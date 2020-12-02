<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div
        class="col-md-12 mt-3"
      >
      <transition name="fade">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">
              التقييم المُعرف بـ {{ OneFeedback._id }}
            </h3>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="name d-flex">
                  <h5>اسم العميل: </h5>
                  <p class="mb-0">{{ OneFeedback.name }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="name d-flex">
                  <h5>الهاتف: </h5>
                  <p class="mb-0">{{ OneFeedback.phone }}</p>
                </div>
              </div>
              <div class="col-12 mt-2">
                <div class="comment" style="background-color: #e9f3fb; padding: 0.5rem;">
                  <h5>التعليق</h5>
                  <p class="mb-0">{{ OneFeedback.comment }}</p>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>جودة الطعام</h5>
                  <star-rating
                    :rating="OneFeedback.foodQuality.score"
                    :star-size="20"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>مكان النظافة</h5>
                  <star-rating
                    :rating="OneFeedback.placeCleanliness.score"
                    :star-size="23"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>سرعة الخدمة</h5>
                  <star-rating
                    :rating="OneFeedback.serviceSpeed.score"
                    :star-size="23"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>جودة التطبيق</h5>
                  <star-rating
                    :rating="OneFeedback.appExperience.score"
                    :star-size="23"
                  ></star-rating>
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div class="foodQuality">
                  <h5>الخبرة العامة</h5>
                  <star-rating
                    :rating="OneFeedback.overallExperience.score"
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
      OneFeedback: (state) => state.FeedbackManagement.OneFeedback,
      Alert: (state) => state.Alert,
    }),
  },
  methods: {
    ...mapActions("FeedbackManagement", {
      deleteFeedback: "deleteFeedback"
    }),
    async deleteFeedbackC(feedbackId) {
      const res = await this.deleteFeedback({ feedbackId });
      console.log(res);
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
  },
  async created() {
    const res = await this.$store.dispatch("FeedbackManagement/showFeedback", { feedbackId: this.$route.params.feedbackId });
    if (res.status === true) {
      Swal.fire({
        title: "حالة التقييم",
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
