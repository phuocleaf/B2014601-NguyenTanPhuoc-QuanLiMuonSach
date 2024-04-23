<script>
    import BookService from "@/services/book.service";

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

        }
    };
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên sách</th>
        <th scope="col">Số quyển</th>
        <!-- Thêm các cột khác tùy thuộc vào thông tin bạn muốn hiển thị -->
      </tr>
    </thead>
    <tbody>
       <tr
      v-for="(book, index) in books"
      :key="book._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
        <td>{{ index + 1 }}</td> <!-- Thêm cột STT -->
        <td>{{ book.TenSach }}</td>
        <td>{{ book.SoQuyen }}</td>
        <!-- Thêm các cột khác tùy thuộc vào thông tin bạn muốn hiển thị -->
    </tr>
    </tbody>
  </table>
</template>
