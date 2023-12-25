<template>
    <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="用户管理" name="first">User</el-tab-pane>
        <el-tab-pane label="订单管理" name="second">
            <Order />
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>

import { ref } from 'vue'
import Order from '../components/Order.vue'
const activeName = ref('first')
</script>
<script>
export default {
    components: {
        Order
    }
}
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs {
    height: 80vh;
}

.el-tabs__content {
    height: 100%;
}
</style>
  