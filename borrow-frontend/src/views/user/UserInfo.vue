<template>
    <AppHeader/>
    <div class="mt-3" v-if="userInfo">
        <h4 class="p-1">
            <i class="fas fa-user"></i>
            Tài Khoản
            
        </h4>
        <div class="p-1">
            <strong>Họ lót:</strong>
            {{ userInfo && userInfo.HoLot }}
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ userInfo && userInfo.Ten }}
        </div>
        <div class="p-1">
            <strong>Ngày sinh:</strong>
            {{ userInfo && userInfo.NgaySinh }}
        </div>
        <div class="p-1">
            <strong>Giới tính:</strong>
            {{ userInfo && userInfo.Phai }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ userInfo && userInfo.DiaChi }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ userInfo && userInfo.DienThoai }}
        </div>
        <button class="btn btn-sm btn-success" @click="signOut">
            <i class="fas fa-sign-out-alt"></i> Đăng Xuất
        </button>
    </div>
    <div v-else>
        <p>Bạn chưa đăng nhập</p>
    </div>
</template>

<script>
import DocGiaService from "@/services/DocGia.service";
import AppHeader from "@/components/user/AppHeader.vue";
export default {
    components: {
        AppHeader
    },
    data() {
        return {
            userInfo: null
        };
    },
    mounted() {
        const userId = localStorage.getItem("UserId");
        if (userId) {
            this.getUserInfo(userId);
        }
    },
    methods: {
        async getUserInfo(userId) { 
            try {
                const response = await DocGiaService.getDocGia(userId);
                // Kiểm tra nếu response chứa dữ liệu adminInfo
                if (response) {
                    this.userInfo = response; // Điều chỉnh cho phù hợp với cấu trúc response từ API
                } else {
                    console.error('Dữ liệu userInfo không hợp lệ:', response);
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin user:', error);
            }
        },

        signOut() {
            localStorage.removeItem("UserId");
            alert("Đăng xuất thành công");
            this.$router.push({ name: "home" });
        },
    }
};
</script>
