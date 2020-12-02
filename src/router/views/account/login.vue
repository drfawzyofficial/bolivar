<template>
  <div class="account-pages my-5 pt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card overflow-hidden">
            <div class="bg-primary">
              <div class="text-primary text-center p-4">
                <h5 class="text-white font-size-20">مرحبًا بعودتك</h5>
                <p class="text-white-50">سجل دخولك الآن إلى لوحة التحكم</p>
                <a href="/" class="logo logo-admin">
                  <img
                    src="@/assets/images/logo-sm.png"
                    height="24"
                    alt="Bolivar"
                    title="Bolivar"
                  />
                </a>
              </div>
            </div>
            <div class="card-body p-4">
              <div class="p-3">
                <div  v-if="Alert.message" class="mt-3 alert alert-dismissible fade show"  role="alert" :class="'alert ' + Alert.type">
                  <strong>إشعار</strong> {{ Alert.message }}
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <b-form @submit.prevent="Login" class="form-horizontal mt-4">
                  <b-form-group
                    id="usernameForm"
                    label="اسم المستخدم"
                    label-for="usernameForm"
                  >
                    <b-form-input
                      id="username"
                      v-model="username"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="passwordForm"
                    label="كلمة السر"
                    label-for="passwordForm"
                    class="mb-3"
                  >
                    <b-form-input
                      id="password"
                      v-model="password"
                      type="password"
                      placeholder="أدخل كلمة السر بشكل صحيح"
                    ></b-form-input>
                  </b-form-group>

                  <div class="form-group row">
                    <div class="col-12 text-left">
                      <b-button
                        type="submit"
                        variant="primary"
                        class="w-md"
                        :disabled="Auth.status.loggingIn"
                        > تسجيل الدخول
                         <span v-show="Auth.status.loggingIn" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                         <span class="sr-only">Loading...</span>
                      </b-button>
                    </div>
                  </div>

                  <div class="form-group mt-2 mb-0 row">
                    <div class="col-12 text-center">
                      <p class="mb-0">
                        ©
                        {{ new Date().getFullYear() }} Bolivar. Crafted with
                        <i class="mdi mdi-heart text-danger"></i> by Bolivar
                      </p>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
  </div>
</template>

<script>
// import { authMethods } from "@/state/helpers";
import appConfig from "@/app.config";
import { mapState, mapActions } from "vuex";

/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      Auth: (state) => state.Auth,
      Alert: (state) => state.Alert,
    }),
  },
  created() {
    // reset login status
    this.$store.dispatch("Auth/logout");
  },
  methods: {
    ...mapActions('Auth', {
      login: 'login'
    }),
    Login() {
      const { username, password } = this;
      this.login({ username, password });
    },
  },
};
</script>

<style lang="scss" module></style>
