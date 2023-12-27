<template>
    <Menu prop1="2"></Menu>
    <router-view></router-view>
</template>
<script setup>

import { ref, onMounted } from 'vue'
import Menu from '../components/Menu.vue'



</script>
<script>
export default {
    components: {
        Menu
    }
}
</script>
<style ></style>
  