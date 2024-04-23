<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh nhà xuất bản</h4>
        <NXBForm
            :book="book"
            @submit:book="updateBook"
            @delete:book="deleteBook"
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
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                book: null,
                message: "",
            };
        },
        methods: {
            async getBook() {
                console.log(this.$route.params.id);
                try {
                    this.book = await NXBService.get(this.$route.params.id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1),
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async updateBook(data) {
                try {
                    await NXBService.update(this.book._id, data);
                    console.log(data);
                    this.message = "Cập nhật sách thành công.";
                    //this.$router.go(-1);
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteBook() {
                if (confirm("Bạn muốn xóa Sách này?")) {
                    try {
                        await NXBService.delete(this.book._id);
                        this.$router.go(-1);
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
    created() {
            console.log(this.$route.params.id);
            this.getBook();
            this.message = "";
        },
    };
</script>
