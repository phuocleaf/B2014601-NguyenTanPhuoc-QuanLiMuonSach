<script>
    import NXBService from "@/services/NXB.service";

    export default {
        props: {
            books: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
  },
   emits: ["update:activeIndex", "updateBooks"],
  methods: {
          updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
            async deleteBook(bookId) {
                console.log(bookId)
                if (confirm("Bạn muốn xóa thông tin nhà xuất bản này?")) {
                    try {
                    await NXBService.delete(bookId);
                    // Sau khi xóa, cần cập nhật lại danh sách sách
                    // Đây là một phương thức được định nghĩa ở component cha và được truyền qua props vào component này
                    this.$router.go(0);
                    } catch (error) {
                    console.log(error);
                    }
                }
                },

        }
        
    };
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên Nhà Xuất Bản</th>
        <!-- Thêm các cột khác tùy thuộc vào thông tin bạn muốn hiển thị -->
        <th scope="col">Hành động</th> <!-- Thêm cột hành động -->
      </tr>
    </thead>
    <tbody>
       <tr
      v-for="(book, index) in books"
      :class="{ active: index === activeIndex }"
      :key="book._id"
      @click="updateActiveIndex(index)"
    >
        <td>{{ index + 1 }}</td> <!-- Thêm cột STT -->
        <td>{{ book.TenNXB }}</td>
        <td>
        <button class="btn btn-danger" @click="deleteBook(book._id)">Xóa</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
