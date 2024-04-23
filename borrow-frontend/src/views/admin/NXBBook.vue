<template>
    <app-header />
    <div class="mt-3 page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                
                Nhà Xuất Bản
                
            </h4>
             <NXBList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
                v-model:activeIndex="activeIndex"
                @updateBooks="retrieveBooks"
                />
            <p v-else>Không có sách nào.</p>
            <div class="mt-3 col-md-6 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                    Chi tiết Sách
                    
                </h4>
                <NXBCard :book="activeBook" />
                <router-link
                    :to="{
                        name: 'nxb.edit',
                        params: { id: activeBook._id },
                    }"
                    >
                        <span class="mt-2 badge badge-warning">
                            <i class="fas fa-pencil-alt"></i> Hiệu chỉnh</span
                        >
                    </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import NXBCard from "@/components/admin/NXBCard.vue";
import InputSearch from "@/components/admin/InputSearch.vue";
import NXBList from "@/components/admin/NXBList.vue";
import NXBService from "@/services/NXB.service";
import AppHeader from "@/components/admin/AppHeader.vue";

export default {
    components: {
        NXBCard,
        InputSearch,
        NXBList,
        AppHeader,
    },

    data() {
        return {
            books: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
    // Chuyển các đối tượng book thành chuỗi để tiện cho tìm kiếm.
        bookStrings() {
            return this.books.map((book) => {
                const { TenNXB, DiaChi } = book;
                return [TenNXB, DiaChi].join("");
            });
        },
        // Trả về các book có chứa thông tin cần tìm kiếm.
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },

        activeBook() {
            if (this.activeIndex < 0) return null;
            console.log("activeBook: " + this.filteredBooks[this.activeIndex]._id)
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },

    methods: {
        async retrieveBooks() {
            try {
                this.books = await NXBService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.searchText = "";
            this.activeIndex = -1;
        },
        goToAddBook() {
            this.$router.push({ name: "nxb.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<!-- <style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style> -->
