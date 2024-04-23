<template>
    <div class="page admin" style="height: 100vh;">
        <div class="loginadmin">
            <SignInForm @submit:signin="submitSignIn" />
            <p class="text-center text-danger">{{ message }}</p>
        </div>
    </div>
</template>
<script>
import NhanVienService from "@/services/NhanVien.service";
import SignInForm from "@/components/admin/SignInForm.vue";
import { defineComponent, ref } from "vue";

import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignInForm,
    },
    setup() {
        const router = useRouter();
        const message = ref("");
        const submitSignIn = async (data) => {
            try {
                const response = await NhanVienService.signIn(data);
                const AdminId = response._id;
                localStorage.setItem("AdminId", AdminId);
                alert("Đăng nhập thành công");
                router.push({ name: 'borrowbook' });
            } catch (error) {
                console.log(error);
                message.value = "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.";
            }
        };
        return {
            message,
            submitSignIn
        }
    },
});
</script>