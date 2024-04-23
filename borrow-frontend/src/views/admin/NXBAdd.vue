<template>
    <div v-if="book" class="page">
        <h4>Thêm nhà xuất bản</h4>
        <NXBForm
            :book="book"
            @submit:book="addBook"
            />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import NXBForm from "@/components/admin/NXBForm.vue";
    import NXBService from "@/services/NXB.service";
    export default {
        components: {
            NXBForm,
        },
        data() {
            return {
                book: {
                    TenNXB: "",
                    DiaChi: "",
                },
                message: "",
            };
        },
        methods: {
            async addBook(data) {
                try {
                    await NXBService.create(data);
                    this.message = "Thêm sách thành công.";
                    //this.$router.go(-1);
                } catch (error) {
                    console.log("Thêm sách thất bại.");
                }
            },
        },
    };
</script>
