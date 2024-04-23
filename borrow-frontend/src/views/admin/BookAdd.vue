<template>
    <div v-if="book" class="page">
        <h4>Thêm Sách</h4>
        <BookForm
            :book="book"
            @submit:book="addBook"
            />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import BookForm from "@/components/admin/BookForm.vue";
    import BookService from "@/services/book.service";
    export default {
        components: {
            BookForm,
        },
        data() {
            return {
                book: {
                    TenSach: "",
                    DonGia: "",
                    SoQuyen: "",
                    NamXuatBan: "",
                    MaNXB: "",
                    NguonGoc: "",
                    TacGia: "",
                },
                message: "",
            };
        },
        methods: {
            async addBook(data) {
                try {
                    await BookService.create(data);
                    this.message = "Thêm sách thành công.";
                    //this.$router.go(-1);
                } catch (error) {
                    console.log("Thêm sách thất bại.");
                }
            },
        },
    };
</script>
