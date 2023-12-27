<template>
    <p class="title" @click="handleClick">订单管理 &nbsp;</p>
    <p class="title">| &nbsp;订单详情</p>


    <!-- 订单详情 -->
    <div class="details">
        <!-- 订单状态 -->
        <div class="controls">
            <div class="controls_left">
                <p>订单详情</p>
                <el-button type="success">{{ orderStatus }}</el-button>
            </div>
            <el-button type="primary" @click="centerDialogVisible = true" v-if="orderStatus !== '已完成'">结束订单</el-button>

            <!-- 结束订单弹框 -->
            <el-dialog v-model="centerDialogVisible" width="30%" align-center center>
                <span style="margin-left: 190px;font-size: 20px;">是否确定完成订单</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="finish">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
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
                <el-table-column label="完成时间" width="200">
                    <template #default="scope">{{ scope.row.finishTime }}</template>
                </el-table-column>
                <el-table-column label="状态" width="200">
                    <template #default="scope">{{ scope.row.status }}</template>
                </el-table-column>
                <el-table-column label="现场图片" show-overflow-tooltip>
                    <template #default="scope">{{ scope.row.img }}</template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="changeSchedule">修改</el-button>
                        <el-button link type="primary" size="small" v-if="scope.row.status !== '已完成'"
                            @click="allocation">分配</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 服务评价 -->
        <div class="evaluate" v-if="orderStatus == '已完成'">
            <el-divider />
            <p>服务评价</p>
            <div class="mark">
                <p>服务打分 :</p><el-rate v-model="mark" allow-half />
            </div>
            <div class="imgEvaluate">
                <p>服务非常好，非常满意</p>
                <img src="../assets/background.png" alt="" style="height: 120px;width: 250px;margin-right: 20px;">
                <img src="../assets/background.png" alt="" style="height: 120px;width: 250px;margin-right: 20px;">

            </div>
        </div>
    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

//返回订单管理
const router = useRouter()
const handleClick = () => {
    router.push({ name: 'orderManagement', })
}
//跳转分配
const allocation = () => {
    router.push({ name: 'orderAllocation', })
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
const changeSchedule = () => {
    console.log("changeSchedule");
}

//评分
const mark = ref(4)
</script>
  
<style lang="scss" scoped>
// 订单详情
// 订单操作
.title {
    font-size: 17px;
    margin-top: 0px;
    display: inline-block;
    cursor: pointer;
}

.controls {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: -10px;

    .controls_left {
        display: flex;
        align-items: center;

        p {
            margin: 0px 30px 0px 20px
        }

        .el-button:hover {
            background-color: #67c23a;
            border-color: #67c23a;
        }
    }
}

//订单信息
.orderInfo {
    font-size: 15px;
    display: flex;
    flex-wrap: wrap;

    // justify-content: space-between;

    p {
        margin-right: 200px;
        width: 350px;
    }
}

// 订单进度
.schedule {
    p {
        font-size: 16px;
        margin-left: 20px;
    }
}

//服务评价
.evaluate {
    margin-top: 40px;
    font-size: 16px;

    p {
        margin-left: 20px;
    }

    .mark {
        font-size: 14px;
        margin-left: 25px;
        display: flex;
        align-items: center
    }

    .imgEvaluate {
        font-size: 16px;
        margin-left: 25px;
        height: 100%;
        width: 100%;
    }
}
</style>
