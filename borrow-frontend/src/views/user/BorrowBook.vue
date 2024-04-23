<template>
    <AppHeader/>
    <div class="page row mt-3">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                
                Sách
                
            </h4>
             <BookList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
                v-model:activeIndex="activeIndex"
                @updateBooks="retrieveBooks"
                />
            <p v-else>Không có sách nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                    Chi tiết Sách
                    
                </h4>
                <BookCard :book="activeBook" />
                <button class="btn btn-sm btn-success">
                    <i class="fas fa-plus"></i> Mượn sách
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from "@/components/user/AppHeader.vue";
import BookCard from "@/components/admin/BookCard.vue";
import InputSearch from "@/components/admin/InputSearch.vue";
import BookList from "@/components/user/BookList.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
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
                const { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGoc, TacGia, TenNXB } = book;
                return [TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, NguonGoc, TacGia, TenNXB].join("");
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
            console.log("activeBook: " + this.filteredBooks[this.activeIndex].MaNXB)
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },

    methods: {
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.searchText = "";
            this.activeIndex = -1;
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
