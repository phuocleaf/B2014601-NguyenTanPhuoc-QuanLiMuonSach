<template>
    <div class="page">
        <SignUpForm @submit:signup="submitSignUp" />
        <p class="text-center text-danger">{{ message }}</p>
    </div>
</template>

<script>
import SignUpForm from "@/components/user/SignUpForm.vue";
import DocGiaService from "@/services/DocGia.service";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    components: {
        SignUpForm,
    },
    setup(props, context) {
        const message = ref("");
        const router = useRouter();
        const submitSignUp = async (data) => {
            try {
                const response = await DocGiaService.create(data);
                const insertedId = response.insertedId;
                if (insertedId) {
                    alert("Đăng ký thành công");
                    router.push({ name: 'user.login' });
                } else {
                    message.value = "Số điện thoại đã được đăng ký. Vui lòng thử lại.";
                }
            } catch (error) {
                console.log(error);
                message.value = "Đăng ký thất bại. Vui lòng thử lại.";
            }
        };
        return { message, submitSignUp, }
    },
});
</script>