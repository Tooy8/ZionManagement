<template>
  <div class="back">
    <!-- <button @click="getinfo">123</button> -->
    <div class='loginForm'>
      <div class="title">安装服务管理后台</div>
      <el-radio-group label="label position">

      </el-radio-group>
      <div style="margin: 20px" />
      <el-form label-position="top" label-width="100px" :model="formLabelAlign" style="max-width: 375px" class="info">
        <el-form-item label="登录账户">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="账号密码">
          <el-input v-model="formLabelAlign.password" />
        </el-form-item>
        <el-button type="primary" link class="forget">忘记密码？</el-button>
        <el-button type="primary" class="submit" @click="login">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script  setup>
import { ref, toRefs, reactive } from "vue"
import { useRouter, useRoute } from 'vue-router'
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
const router = useRouter()
const login = () => {
  router.push({ name: 'user', })
}
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginForm {
  width: 551px;
  height: 554px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid rgb(65, 127, 250);
  position: absolute;
  left: 186px;
  bottom: 180px;

  .title {
    left: 187px;
    top: 236px;
    width: 551px;
    height: 88px;
    line-height: 88px;
    border-radius: 20px 20px 0px 0px;
    background-color: rgba(65, 127, 250, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 28px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(65, 127, 250, 1);
  }

  .info {
    display: flex;
    flex-direction: column;
    margin-left: 87px;
    position: relative;
    margin-top: 38px;



    .el-input {
      height: 45px;
      color: rgba(0, 0, 0, 1);
      color: rgba(16, 16, 16, 1);
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
    }

    .forget {
      position: absolute;
      top: 185px;
      right: 0px;
      color: rgba(6, 63, 248, 1);
      font-size: 18px;
      text-align: left;
      font-family: SourceHanSansSC-regular;
    }

    .submit {
      margin-top: 70px;
      width: 100%;
      margin-left: 0px;
      height: 52px;
      line-height: 20px;
      border-radius: 10px;
      background-color: rgba(65, 127, 250, 1);
      font-size: 14px;
    }
  }
}
</style>

