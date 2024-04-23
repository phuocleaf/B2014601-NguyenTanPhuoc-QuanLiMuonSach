<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="bookLocal.TenSach"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="price">Đơn giá</label>
            <Field
                name="price"
                type="number"
                class="form-control"
                v-model="bookLocal.DonGia"
            />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="quantity">Số quyển</label>
            <Field
                name="quantity"
                type="number"
                class="form-control"
                v-model="bookLocal.SoQuyen"
            />
            <ErrorMessage name="quantity" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="year">Năm xuất bản</label>
            <Field
                name="year"
                type="number"
                class="form-control"
                v-model="bookLocal.NamXuatBan"
            />
            <ErrorMessage name="year" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="publisher">Nhà Xuất Bản</label>
            <select
                name="publisher"
                class="form-control"
                v-model="bookLocal.MaNXB"
            >
                <option v-for="publisher in publishers" :key="publisher.MaNXB" :value="publisher._id">
                    {{ publisher.TenNXB }}
                </option>
            </select>
            <ErrorMessage name="publisher" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="origin">Nguồn gốc</label>
            <Field
                name="origin"
                type="text"
                class="form-control"
                v-model="bookLocal.NguonGoc"
            />
            <ErrorMessage name="origin" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <Field
                name="author"
                type="text"
                class="form-control"
                v-model="bookLocal.TacGia"
            />
            <ErrorMessage name="author" class="error-feedback" />
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
import NhaXuatBanService from "@/services/NXB.service";

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
            price: yup
                .number()
                .required("Vui lòng nhập đơn giá.")
                .positive("Đơn giá phải là số dương."),
            quantity: yup
                .number()
                .required("Vui lòng nhập số lượng.")
                .positive("Số lượng phải là số dương.")
                .integer("Số lượng phải là số nguyên."),
            year: yup
                .number()
                .required("Vui lòng nhập năm xuất bản.")
                .min(1000, "Năm xuất bản không hợp lệ.")
                .max(new Date().getFullYear(), "Năm xuất bản không được vượt quá năm hiện tại."),
            origin: yup
                .string()
                .max(100, "Nguồn gốc không được vượt quá 100 ký tự."),
            author: yup
                .string()
                .required("Vui lòng nhập tác giả.")
        });
        return {
            bookLocal: { ...this.book },
            bookFormSchema,
            publishers: [], // Danh sách nhà xuất bản
        };
    },
    async mounted() {
        try {
            this.publishers = await NhaXuatBanService.getAll();
        } catch (error) {
            console.error('Error fetching publishers:', error);
        }
    },
    methods: {
        submitBook() {
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
