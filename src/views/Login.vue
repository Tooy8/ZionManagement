<template>
  <div class="back">
    <!-- <button @click="getinfo">123</button> -->
    <div class='loginForm'>
      <div class="title">安装服务管理后台</div>
      <el-radio-group label="label position">

      </el-radio-group>
      <div style="margin: 20px" />
      <el-form label-position="top" label-width="100px" :model="formLabelAlign" style="max-width: 240px" class="info">
        <el-form-item label="登录账户">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="账号密码">
          <el-input v-model="formLabelAlign.password" />
        </el-form-item>
        <el-button type="primary" link class="forget">忘记密码？</el-button>
        <el-button type="primary" class="submit">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script  setup>
import { ref, toRefs, reactive } from "vue"
import zionMdapi from 'zion-mdapi';

const formLabelAlign = reactive({
  name: '',
  password: '',
});

// const mdapi = zionMdapi.init({
//   url: "https://zion-app.functorz.com/zero/KrABb5MyoXo/api/graphql-v2",
//   // actionflow_id: "bf5cd50e-2be3-4331-aab7-8d973212ea95"
// })

// async function getinfo() {
//   console.log(mdapi)
//   const user = await mdapi.nativeQuery({
//     model: "info",
//     fields: ["name", "password"]
//   }).catch(e => {
//     console.log(e);
//   })
//   console.log(user);
// }
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginForm {
  width: 350px;
  height: 360px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  border: 1px solid rgb(65, 127, 250);
  position: absolute;
  left: 300px;

  .title {
    background-color: rgb(65, 127, 250);
    height: 60px;
    color: aliceblue;
    text-align: center;
    line-height: 60px;
    border-radius: 10px 10px 0 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    position: relative;


    .forget {
      position: absolute;
      top: 150px;
      right: 0px;
      font-size: small;
    }

    .submit {
      margin-top: 20px;
      width: 100%;
      margin-left: 0px;
    }
  }
}
</style>

