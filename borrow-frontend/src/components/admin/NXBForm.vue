<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name">Tên Nhà Xuất Bản</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="bookLocal.TenNXB"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="origin">Địa Chỉ</label>
            <Field
                name="origin"
                type="text"
                class="form-control"
                v-model="bookLocal.DiaChi"
            />
            <ErrorMessage name="origin" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <button class="btn btn-primary">{{ bookLocal._id ? 'Cập nhật' : 'Lưu' }}</button>
            <!-- <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">Xóa</button> -->
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, default: () => ({}) } // Khởi tạo một đối tượng rỗng nếu không có dữ liệu được truyền vào
    },
    data() {
        const bookFormSchema = yup.object().shape({         
            name: yup
                .string()
                .required("Tên sách không được bỏ trống.")
                .min(2, "Tên sách phải có ít nhất 2 ký tự.")
                .max(50, "Tên sách không được vượt quá 50 ký tự."),
            origin: yup
                .string()
                .max(100, "Nguồn gốc không được vượt quá 100 ký tự."),
        });
        return {
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    
    methods: {
        submitBook() {
            console.log(this.bookLocal);
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal._id);
        },
    },
};
</script>

<style scoped>
    @import "@/assets/form.css";
</style>
