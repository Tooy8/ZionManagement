<template>
    <p class="title" @click="handleClick">订单管理 &nbsp;</p>
    <p class="title">| &nbsp;订单分配</p>


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

                <el-form-item label="进度">
                    <el-select v-model="formInline.region" placeholder="请输入内容"
                        :style="{ width: '300px', marginRight: '90px' }" clearable>
                        <el-option label="空调安装" value="shanghai" />
                        <el-option label="配地暖安装" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="工种">
                    <el-select v-model="formInline.status" placeholder="请输入内容"
                        :style="{ width: '300px', marginRight: '90px' }" clearable>
                        <el-option label=" 待分配" value="shanghai" />
                        <el-option label="处理中" value="beijing" />
                        <el-option label="待评价" value="qwe" />
                        <el-option label="已完成" value="asd" />
                    </el-select>
                </el-form-item>
                <el-form-item label="施工人员">
                    <el-select v-model="formInline.region" placeholder="请输入内容"
                        :style="{ width: '300px', marginRight: '90px' }" clearable>
                        <el-option label="空调安装" value="shanghai" />
                        <el-option label="配地暖安装" value="beijing" />
                    </el-select>
                </el-form-item>

            </el-form>
        </div>
        <div class="controls">
            <p>订单详情</p>
        </div>
        <el-divider />
        <!-- 订单信息 -->
        <div class="orderInfo">
            <p>订单编号：{{ orderInfo.orderNum }}</p>
            <p>下单时间：{{ orderInfo.orderTime }}</p>
            <p>订单内容：{{ orderInfo.content }}</p>
            <p>客户姓名：{{ orderInfo.name }}</p>
            <p>联系电话：{{ orderInfo.number }}</p>
            <p>安装地址：{{ orderInfo.address }}</p>
            <p>预约时间：{{ orderInfo.appointment }}</p>
            <p>备注：{{ orderInfo.remark }}</p>
            <p>现场图片：{{ orderInfo.img }}</p>
        </div>
        <el-divider />
        <!-- 订单进度 -->
        <div class="schedule">
            <p>订单进度</p>
            <el-table :data="scheduleData" style="width: 100%">
                <el-table-column label="序号" width="150">
                    <template #default="scope">{{ scope.row.num }}</template>
                </el-table-column>
                <el-table-column label="进度" width="160">
                    <template #default="scope">{{ scope.row.schedule }}</template>
                </el-table-column>
                <el-table-column label="人员" width="190">
                    <template #default="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="联系方式" width="250">
                    <template #default="scope">{{ scope.row.number }}</template>
                </el-table-column>
                <el-table-column label="施工详情" width="300">
                    <template #default="scope">{{ scope.row.address }}</template>
                </el-table-column>
                <el-table-column label="完成时间" width="250">
                    <template #default="scope">{{ scope.row.finishTime }}</template>
                </el-table-column>
                <el-table-column label="状态" width="200">
                    <template #default="scope">{{ scope.row.status }}</template>
                </el-table-column>
                <el-table-column label="现场图片" show-overflow-tooltip>
                    <template #default="scope">{{ scope.row.img }}</template>
                </el-table-column>


            </el-table>
        </div>

    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

//表单数据
const formInline = reactive({
    user: '',
    region: '',
    date: '',
    status: ''
})

//返回订单管理
const router = useRouter()
const handleClick = () => {
    router.push({ name: 'orderManagement', })
}

//订单状态
const orderStatus = ref('处理中')
//结束订单弹框 
const centerDialogVisible = ref(false)
//结束订单操作
const finish = () => {
    centerDialogVisible.value = false
    orderStatus.value = '已完成'
}

//订单信息
const orderInfo = {
    orderNum: '65342112345',
    orderTime: '2016-05-03',
    content: '配地暖安装',
    name: '小明',
    number: "13194210403",
    address: '湖南省xx和平花园1单元202室内',
    appointment: "2016-05-08 16:00",
    remark: '无',
    img: "无",
    status: '待分配'
}
//订单进度
const scheduleData = [{
    num: '1',
    schedule: "安装",
    name: "人员",
    number: '12334545667',
    address: '拱墅区和平花园1单元202室内',
    finishTime: '2023-12-1 12:00',
    status: '已完成',
    img: "无",
},

{
    num: '2',
    schedule: "安装",
    name: "人员",
    number: '12334545667',
    address: '拱墅区和平花园1单元202室内',
    finishTime: '2023-12-1 12:00',
    status: '进行中',
    img: "无",

}]
//修改订单进度

</script>
  
<style lang="scss" scoped>
.title {
    font-size: 17px;
    margin-top: 0px;
    display: inline-block;
    cursor: pointer;
}

// 订单分配
.demo-form-inline {
    display: flex;

    justify-content: flex-start;
    margin-left: 30px;

}

.search {
    margin-bottom: 80px;
}

// 订单详情
// 订单操作
.controls {
    p {
        margin: 0px 0px 0px 30px;
        color: rgba(16, 16, 16, 1);
        font-size: 18px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
    }
}


//订单信息
.orderInfo {
    font-size: 15px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 50px;

    p {
        margin-right: 200px;
        width: 350px;
    }
}

// 订单进度
.schedule {
    p {
        margin: 0px 0px 30px 30px;
        color: rgba(16, 16, 16, 1);
        font-size: 18px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
    }
}
</style>
