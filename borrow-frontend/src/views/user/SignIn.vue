<template>
    <div class="page admin" style="height: 100vh;">
        <div class="loginadmin">
            <SignInForm @submit:signin="submitSignIn" />
            <p class="text-center text-danger">{{ message }}</p>
        </div>
    </div>
</template>
<script>
import DocGiaService from "@/services/DocGia.service";
import SignInForm from "@/components/user/SignInForm.vue";
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
                const response = await DocGiaService.signIn(data);
                const userId = response._id;
                localStorage.setItem("UserId", userId);
                alert(" Đăng nhập thành công");
                router.push({ name: 'home' });
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