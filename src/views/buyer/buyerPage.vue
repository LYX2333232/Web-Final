<script setup lang="ts">
import { useUserStore } from '../../stores/user';

const { username, password } = useUserStore();


console.log(username)
console.log(password)
</script>

<template>
    <el-aside>
        <el-menu>
            <el-menu-item index="1">主页</el-menu-item>
            <el-menu-item index="2">订单</el-menu-item>
            <el-menu-item index="3">购物车</el-menu-item>
            <el-menu-item index="4">个人信息</el-menu-item>
        </el-menu>
    </el-aside>
    <el-main>
        <div>
            <h2>买家主页</h2>
            <div>{{ username }}</div>
            <div>{{ password }}</div>
        </div>
        <router-view />
    </el-main>
</template>