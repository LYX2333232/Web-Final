<script setup lang="ts">
import { useUserStore } from '../../stores/user';

const { username, password } = useUserStore();


console.log(username)
console.log(password)
</script>

<template>
    <el-container>
        <el-aside>
            <el-menu router>
                <el-menu-item index="/buyerHome/main">主页</el-menu-item>
                <el-menu-item index="/buyerHome/cart">购物车</el-menu-item>
                <el-menu-item index="/buyerHome/info">个人信息</el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>