<script setup>
import { useUserStore } from '@/stores/user'

const { username, password } = useUserStore()
</script>

<template>
    <div>
        <h2>买家信息</h2>
        <div>{{ username }}</div>
        <div>{{ password }}</div>
    </div>
</template>