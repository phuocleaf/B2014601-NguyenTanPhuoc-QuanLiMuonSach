<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/admin" class="navbar-brand">Quản lý mượn sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'borrowbook' }" class="nav-link">
                    
                    Sách
                    
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'NXB' }" class="nav-link">
                    
                    Nhà Xuất Bản
                    
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'admin.info' }" class="nav-link">
                    
                    Tài Khoản
                    
                </router-link>
            </li>
        </div>
    </nav>
</template>