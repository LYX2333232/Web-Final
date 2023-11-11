<script setup lang="ts">
import { useUserStore } from '../../stores/user';

const {username,password} = useUserStore();


console.log(username)
console.log(password)
</script>

<template>
    <div>
        <h1>Home</h1>
        <div>{{username}}</div>
        <div>{{password}}</div>
    </div>
</template>