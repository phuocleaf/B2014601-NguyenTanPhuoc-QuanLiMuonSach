<!-- <template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Quản lý mượn sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                    <i class="fas fa-book"></i>
                    Sách
                </router-link>
            </li>
        </div> 
    </nav>
</template> -->

<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Quản lý mượn sách</a>
        <div class="navbar-collapse justify-content-between">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'home' }" class="nav-link">
                        Sách
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="localStorageAvailable" :to="{ name: 'user.info' }" class="nav-link">
                        Tài khoản
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="!localStorageAvailable" :to="{ name: 'user.login' }" class="nav-link">
                        Đăng nhập
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="!localStorageAvailable" :to="{ name: 'user.signup' }" class="nav-link">
                        Đăng ký
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>



<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            localStorageAvailable: localStorage.getItem("UserId") !== null,
        };
    }
});
</script>




