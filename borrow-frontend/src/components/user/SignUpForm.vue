<template>
    <Form @submit="submitSignUp" :validation-schema="signUpFormSchema" class="w-50 m-auto">
        <h4 class="text-center">Đăng ký</h4>
        <div class="row">
            <div class="col">
                
                <div class="form-group">
                    <label for="HoLot">Họ Lót</label>
                    <Field name="HoLot" type="text" class="form-control" v-model="signUpLocal.HoLot" />
                    <ErrorMessage name="HoLot" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="Ten">Tên</label>
                    <Field name="Ten" type="text" class="form-control" v-model="signUpLocal.Ten" />
                    <ErrorMessage name="Ten" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="Phai">Giới tính</label>
                    <div class="form-check form-check-inline">
                        <Field name="Phai" type="radio" class="form-check-input" value="Nam" v-model="signUpLocal.Phai" />Nam
                    </div>
                    <div class="form-check form-check-inline">
                        <Field name="Phai" type="radio" class="form-check-input ml-4" value="Nữ" v-model="signUpLocal.Phai" />
                        Nữ
                    </div>
                    <ErrorMessage name="Phai" class="error-feedback d-block" />
                </div>

                <div class="form-group">
                    <label for="NgaySinh">Ngày sinh</label>
                    <Field name="NgaySinh" type="date" class="form-control" v-model="signUpLocal.NgaySinh" />
                    <ErrorMessage name="NgaySinh" class="error-feedback" />
                </div>

                
            </div>
            <div class="col">

                <div class="form-group">
                    <label for="DiaChi">Địa chỉ</label>
                    <Field as="textarea" name="DiaChi" class="form-control" v-model="signUpLocal.DiaChi" />
                    <ErrorMessage name="DiaChi" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="DienThoai">Số điện thoại</label>
                    <Field name="DienThoai" type="text" class="form-control" v-model="signUpLocal.DienThoai" />
                    <ErrorMessage name="DienThoai" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="Password">Mật khẩu</label>
                    <Field name="Password" type="password" class="form-control" v-model="signUpLocal.Password" />
                    <ErrorMessage name="Password" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="passwordConfirmation">Xác nhận mật khẩu</label>
                    <Field name="passwordConfirmation" type="password" class="form-control"
                        v-model="signUpLocal.passwordConfirmation" />
                    <ErrorMessage name="passwordConfirmation" class="error-feedback" />
                </div>
            </div>
            
        </div>
        <div class="form-group">
            <button class="btn btn-primary w-100">Đăng ký</button>
        </div>
    </Form>
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
        const signUpLocal = reactive({
            HoLot: "",
            Ten: "",
            NgaySinh: "",
            Phai: "",
            DiaChi: "",
            DienThoai: "",
            Password: "",
            passwordConfirmation: "",
        });

        const signUpFormSchema = yup.object().shape({
            Ten: yup.string().required("Tên không được để trống."),
            HoLot: yup.string().required("Họ lót không được để trống."),
            Phai: yup.string().required("Giới tính không được để trống."),
            NgaySinh: yup.string().required("Ngày sinh không được để trống."),
            DiaChi: yup.string().required("Địa chỉ không được để trống."),
            DienThoai: yup.string().required("Số điện thoại không được để trống."),
            Password: yup.string().required("Mật khẩu không được để trống."),
            passwordConfirmation: yup
                .string()
                .oneOf(
                    [yup.ref("Password"), null],
                    "Mật khẩu xác nhận không trùng khớp."
                )
                .required("Mật khẩu xác nhận không được để trống."),
        });

        const submitSignUp = () => {
            context.emit("submit:signup", signUpLocal);
        };

        return {
            signUpLocal,
            signUpFormSchema,
            submitSignUp,
        };
    },
});
</script>

<style scoped>
@import "@/assets/form.css";
</style>
