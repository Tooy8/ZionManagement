<template>
    <el-menu :default-active="props.prop1" class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <!-- <el-menu-item index="0">
        </el-menu-item> -->
        <img style="width: 92px;height: 92px;margin-left: 80px;" src="../assets/logo.png" />
        <p>安装服务管理后台</p>
        <el-menu-item index="1" style="margin-right: 105px;" @click="user">用户管理</el-menu-item>
        <el-menu-item index="2" @click="handleClick">订单管理</el-menu-item>
        <div class="flex-grow" />
        <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <div>admin</div>
        </div>
    </el-menu>
    <!-- <router-view></router-view> -->
</template>
  
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { defineProps } from 'vue';

const props = defineProps({
    prop1: String
});

//返回订单管理
const router = useRouter()
const handleClick = () => {
    router.push({ name: 'orderManagement', })
}
const user = () => {
    router.push({ name: 'user', })

}
</script>
  
<style lang="scss" scoped >
.flex-grow {
    flex-grow: 1;
}

.el-menu-item {
    color: rgba(16, 16, 16, 1);
    font-size: 28px;
    font-weight: 400;
}

.el-menu {
    --el-menu-hover-bg-color: #fff;
}

.el-menu--horizontal.el-menu {
    border-bottom: 3px solid #dcdfe6 !important
}

.el-menu-demo {
    display: flex;
    align-items: center;
    height: 70px;

    p {
        color: rgba(16, 16, 16, 1);
        font-size: 28px;
        text-align: left;
        font-family: PingFangSC-regular;
        margin-right: 83px;
        font-weight: 700;

    }
}

.avatar {
    width: 159px;
    height: 67px;
    display: flex;
    align-items: center;
    margin-right: 49px;

    div {
        display: inline-block;
        font-size: 16px;
        margin-left: 10px;
    }
}
</style>
  