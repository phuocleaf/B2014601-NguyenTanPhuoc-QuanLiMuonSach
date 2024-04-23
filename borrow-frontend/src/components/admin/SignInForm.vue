<template>
    <div>
      <Form @submit="submitSignIn" :validation-schema="signInFormSchema" style="height: 100%;">
          <div class="d-flex justify-content-center align-items-center" style="height: 100%;">
              <div class="w-25 p-4 formlogin">
                  <h3 class="text-center mt-5 text-primary fw-bold">ĐĂNG NHẬP</h3>
                  <div class="form-group">
                      <label for="SoDienThoai">Số Điện Thoại</label>
                      <Field name="SoDienThoai" type="text" class="form-control" v-model="signInLocal.SoDienThoai" />
                      <ErrorMessage name="SoDienThoai" class="error-feedback" />
                  </div>
                  <div class="form-group">
                      <label for="password">Mật khẩu</label>
                      <Field name="Password" type="password" class="form-control" v-model="signInLocal.Password" />
                      <ErrorMessage name="Password" class="error-feedback" />
                  </div>
                  <div class="form-group text-center">
                      <button type="submit" class="btn btn-primary">Đăng nhập</button>
                  </div>
              </div>
          </div>
      </Form>
    </div>
  </template>
  
  <script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import { defineComponent, reactive } from "vue";
  export default defineComponent({
      components: {
          Form,
          Field,
          ErrorMessage,
      },
      setup(props, context) {
          const signInLocal = reactive({
              SoDienThoai: "",
              Password: "",
          });
          const signInFormSchema = yup.object().shape({
              SoDienThoai: yup.string().required("Số điện thoại không được để trống."),
              Password: yup.string().required("Mật khẩu không được để trống."),
          });
          const submitSignIn = () => {
              context.emit("submit:signin", signInLocal);
          }
          return {
              signInLocal,
              signInFormSchema,
              submitSignIn,
          }
      },
  });
  </script>
  
  <style scoped>
  @import "@/assets/form.css";
  </style>
  