<script>
import NhaXuatBanService from "@/services/NXB.service";
    export default {
        props: {
            book: { type: Object, required: true },
        },
        data() {
        return {
            publisherName: null
        };
    },
    methods: {
        async getPublisherName(publisherId) {
            try {
                const publisher = await NhaXuatBanService.get(publisherId);
                return publisher.TenNXB;
            } catch (error) {
                console.error('Lỗi khi lấy danh sách nhà xuất bản:', error);
                return 'Lỗi khi lấy dữ liệu';
            }
        }
    },
    async mounted() {
        this.publisherName = await this.getPublisherName(this.book.MaNXB);
    }
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên Sách:</strong>
            {{ book.TenSach }}
        </div>
        <div class="p-1">
            <strong>Đơn Giá:</strong>
            {{ book.DonGia }}
        </div>
        <div class="p-1">
            <strong>Số Quyển:</strong>
            {{ book.SoQuyen }}
        </div>
        <div class="p-1">
            <strong>Năm Xuất Bản:</strong>
            {{ book.NamXuatBan }}
        </div>
        <div class="p-1">
            <strong>Nhà Xuất Bản:</strong>
            <span v-if="publisherName"> {{ publisherName }}</span>
            <span v-else>Loading...</span>
        </div>
        <div class="p-1">
            <strong>Địa Chỉ Nhà Xuất Bản:</strong>
            {{ book.DiaChi }}
        </div>
        <div class="p-1">
            <strong>Nguồn Gốc:</strong>
            {{ book.NguonGoc }}
        </div>
        <div class="p-1">
            <strong>Tác Giả:</strong>
            {{ book.TacGia }}
        </div>
    </div>
</template>
