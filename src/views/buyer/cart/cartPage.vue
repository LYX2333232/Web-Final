<script setup>
import { useUserStore } from '@/stores/user'

const { username, password } = useUserStore()
</script>

<template>
    <div>
        <h2>购物车信息</h2>
        <div>{{ username }}</div>
        <div>{{ password }}</div>
    </div>
</template>