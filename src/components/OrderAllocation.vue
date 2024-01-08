<template>
    <div class="title">
        <p @click="handleClick">订单管理 &nbsp;</p>
        <p>| &nbsp;订单分配</p>
    </div>


    <!-- 订单详情 -->
    <div class="details">
        <!-- 订单状态 -->
        <el-divider />
        <div class="controls">
            <p>订单分配</p>
        </div>
        <el-divider />

        <!-- 分配 -->
        <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="序号">
                    <el-input v-model="formInline.idx" placeholder="请输入" :style="{ width: '320px', marginRight: '179px' }"
                        clearable />
                </el-form-item>
                <el-form-item label="进度">
                    <el-input v-model="formInline.name" placeholder="请输入" :style="{ width: '320px', marginRight: '179px' }"
                        clearable />
                </el-form-item>

                <el-form-item label="施工人员">
                    <!-- <el-input v-model="formInline.nickname" placeholder="请输入"
                        :style="{ width: '320px', marginRight: '79px' }" clearable /> -->
                    <el-select v-model="formInline.nickname" placeholder="请选择" clearable style="width: 280px;">
                        <el-option v-for="item in installerName" :label="item.nickname" :value="item.nickname" />

                    </el-select>
                </el-form-item>
                <el-button type="primary" @click="allocation">分配</el-button>
            </el-form>
        </div>
        <div class="controls">
            <p>订单详情</p>
        </div>
        <el-divider />
        <!-- 订单信息 -->
        <div class="orderInfo">
            <p>订单编号：{{ orderInfo.id }}</p>
            <p>下单时间：{{ dayjs(orderInfo.created_at).format('YYYY-MM-DD HH:mm:ss') }}</p>
            <p>订单内容：{{ orderInfo.notes }}</p>
            <p>客户姓名：{{ orderInfo.consignee }}</p>
            <p>联系电话：{{ orderInfo.phone }}</p>
            <p>安装地址：{{ orderInfo.address_detail }}</p>
            <p>预约时间：{{ dayjs(orderInfo.appointment_time).format('YYYY-MM-DD HH:mm') }}</p>
            <p>备注：{{ orderInfo.notes }}</p>
        </div>
        <el-divider />
        <!-- 订单进度 -->
        <div class="schedule">
            <p>订单进度</p>
            <el-table :data="scheduleData" style="width: 100%; padding:10px 80px 0px 80px">
                <el-table-column label="序号" width="150">
                    <template #default="scope">{{ scope.row.idx }}</template>
                </el-table-column>
                <el-table-column label="进度" width="210">
                    <template #default="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="人员" width="200">
                    <template #default="scope">{{ scope.row.installer.nickname }}</template>
                </el-table-column>
                <el-table-column label="联系方式" width="220">
                    <template #default="scope">{{ scope.row.installer.mobile }}</template>
                </el-table-column>
                <!--<el-table-column label="施工详情" width="300">
                    <template #default="scope">{{ scope.row.address }}</template>
                </el-table-column> -->

                <el-table-column label="开始时间" width="240">
                    <template #default="scope">{{ dayjs(scope.row.start_time).format('YYYY-MM-DD:HH') }}</template>
                </el-table-column>
                <el-table-column label="完成时间" width="240">
                    <template #default="scope">{{ dayjs(scope.row.end_time).format('YYYY-MM-DD:HH') }}</template>
                </el-table-column>
                <el-table-column label="备注" width="150">
                    <template #default="scope">{{ scope.row.notes }}</template>
                </el-table-column>

                <el-table-column label="状态" width="200">
                    <template #default="scope">{{ scope.row.status }}</template>
                </el-table-column>

            </el-table>
        </div>

    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs';

//调用接口获取数据
import zionMdapi from 'zion-mdapi';
//mdapi
const mdapi = zionMdapi.init({
    url: "https://zion-app.functorz.com/zero/omOJrPx6KDl/api/graphql-v2",
    actionflow_id: "2e2bea0f-43c0-4844-9bd3-75a06c889da9",
})

//表单数据
const formInline = reactive({
    name: '',
    idx: '',
    nickname: '',
})

//返回订单管理
const router = useRouter()
const handleClick = () => {
    router.push({ name: 'orderManagement', })
}
//获取订单编号
const route = useRoute();
console.log(route.query.id);



//订单信息
const orderInfo = ref({})

//根据订单号搜索数据
async function searchInfo() {
    const order = await mdapi.nativeQuery({
        model: "order",
        where: {
            id: { _eq: route.query.id },
        },
        fields: [
            "created_at",
            "id",
            "consignee",
            "phone",
            "address_detail",
            "appointment_time",
            "notes",
            "process_status",
            "evaluation_star",
            "evaluation_content",
            "order_detail{idx img{url}}"
        ]
    }).catch((e) => {
        console.log(e);
    })
    //订单信息
    orderInfo.value = order[0]
}
searchInfo()
//订单进度
//订单进度信息
const scheduleData = ref([])
//订单进度信息
async function getInfo() {
    const order = await mdapi.query({
        model: "order_progress",
        where: {
            order_order: { _eq: route.query.id },
        },
        fields: [
            "id",
            "notes",
            "name",
            "status",
            "start_time",
            "end_time",
            "installer_installer",
            "idx",
            "installer{mobile nickname}",
        ]
    })
    scheduleData.value = order
    console.log(scheduleData.value);
}
getInfo()

const installer_installer = ref()
//根据师傅昵称查找installer_installer
async function getinstaller() {
    const installer = await mdapi.query({
        model: "installer",
        where: {
            nickname: { _eq: formInline.nickname },
        },
        fields: [
            "nickname",
            "order_progress{name installer_installer}"
        ]
    })
    installer_installer.value = installer[0].order_progress[0].installer_installer

    console.log(installer_installer.value);
}


//分配操作
const allocation = async () => {
    await getinstaller()

    // 修改订单状态为进行中
    mdapi.mutation({
        operation: "update_order",
        where: {
            id: { _eq: route.query.id },
        },
        _set: {
            process_status: "进行中"
        }
    })
    //新增订单进程
    mdapi.mutation({
        operation: "insert_order_progress",
        objects: [{
            order_order: route.query.id,
            name: formInline.name,
            installer_installer: installer_installer.value,
            idx: formInline.idx,
            status: "待处理"
        }],
    })

    //刷新页面
    location.reload();
}

// 获取所有师傅的名字
const installerName = ref([])
const getName = async () => {
    const name = await mdapi.query({
        model: "installer",
        fields: [
            "nickname",
        ]
    })
    installerName.value = name
}

getName()

</script>
  
<style lang="scss" scoped>
.title {
    margin-left: 80px;
    margin-top: 30px;
    width: 180px;
    height: 26px;
    line-height: 25px;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    text-align: left;
    font-weight: 700;
    cursor: pointer;

    p {
        display: inline-block;
        margin: 0;
    }
}

// 订单分配
.demo-form-inline {
    display: flex;

    justify-content: flex-start;
    margin-left: 93px;
    padding-top: 20px;

}

.search[data-v-08ebd34f] {
    margin-bottom: 50px;
}

//分割线
.el-divider--horizontal {
    width: 92%;
    margin: 20px auto;
}

.search {
    margin-bottom: 80px;
}

// 订单详情
// 订单操作
.controls {
    p {
        margin-left: 93px;
        margin-top: 22.8px;
        width: 72px;
        height: 34.41px;
        line-height: 25px;
        color: rgba(16, 16, 16, 1);
        font-size: 16px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
    }
}


//订单信息
.orderInfo {

    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 100px;

    p {
        margin-right: 200px;
        width: 350px;
    }
}

// 订单进度
.schedule {
    p {
        margin: 0px 0px 30px 93px;
        color: rgba(16, 16, 16, 1);
        font-size: 16px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
    }
}
</style>
