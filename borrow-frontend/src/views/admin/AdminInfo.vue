<template>
    <AppHeader/>
    <div class="mt-3" v-if="adminInfo">
        <h4 class="p-1">
            <!-- <i class="fas fa-user"></i> -->
            Tài Khoản
            
        </h4>
        <div class="p-1">
            <strong>Họ tên:</strong>
            {{ adminInfo && adminInfo.HoTenNV }}
        </div>
        <div class="p-1">
            <strong>Chức vụ:</strong>
            {{ adminInfo && adminInfo.ChucVu }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ adminInfo && adminInfo.DiaChi }}
        </div>
        <div class="p-1">
            <strong>Số điện thoại:</strong>
            {{ adminInfo && adminInfo.SoDienThoai }}
        </div>
        <button class="btn btn-sm btn-success" @click="signOut">
            <i class="fas fa-sign-out-alt"></i> Đăng Xuất
        </button>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import NhanVienService from "@/services/NhanVien.service";
import AppHeader from "@/components/admin/AppHeader.vue";
export default {
    components: {
        AppHeader
    },
    data() {
        return {
            adminInfo: null
        };
    },
    mounted() {
        const adminId = localStorage.getItem("AdminId");
        if (adminId) {
            this.getAdminInfo(adminId);
        }
    },
    methods: {
        async getAdminInfo(adminId) {
            try {
                const response = await NhanVienService.getNhanVien(adminId);
                // Kiểm tra nếu response chứa dữ liệu adminInfo
                if (response) {
                    this.adminInfo = response; // Điều chỉnh cho phù hợp với cấu trúc response từ API
                } else {
                    console.error('Dữ liệu adminInfo không hợp lệ:', response);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin admin:', error);
            }
        },

        signOut() {
            localStorage.removeItem("AdminId");
            alert("Đăng xuất thành công");
            this.$router.push({ name: "login" });
        },
    }
};
</script>
