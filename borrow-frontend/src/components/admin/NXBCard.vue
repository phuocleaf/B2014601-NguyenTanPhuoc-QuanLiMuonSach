<script>
import NhaXuatBanService from "@/services/NXB.service";
    export default {
        props: {
            book: { type: Object, required: true },
        },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên Nhà Xuất Bản:</strong>
            {{ book.TenNXB }}
        </div>
        <div class="p-1">
            <strong>Địa Chỉ:</strong>
            {{ book.DiaChi }}
        </div>
       
    </div>
</template>
