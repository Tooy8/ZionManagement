<template>
    <div class="title">
        <p @click="handleClick">订单管理 &nbsp;</p>
        <p>| &nbsp;订单详情</p>
    </div>


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
            <p>订单编号：{{ orderInfo.id }}</p>
            <p>下单时间：{{ dayjs(orderInfo.created_at).format('YYYY-MM-DD HH:mm:ss') }}</p>
            <p>订单内容：{{ orderInfo.notes }}</p>
            <p>客户姓名：{{ orderInfo.consignee }}</p>
            <p>联系电话：{{ orderInfo.phone }}</p>
            <p>安装地址：{{ orderInfo.address_detail }}</p>
            <p>预约时间：{{ dayjs(orderInfo.appointment_time).format('YYYY-MM-DD HH:mm') }}</p>
            <p>备注：{{ orderInfo.notes }}</p>
            <!-- <p>现场图片：{{ orderInfo.img }}</p> -->
        </div>
        <el-divider />
        <!-- 订单进度 -->
        <div class="schedule">
            <p>订单进度</p>
            <el-table :data="scheduleData" style="width: 100%'; padding:10px 80px 0px 80px">
                <el-table-column label="序号" width="150">
                    <template #default="scope">{{ scope.row.idx }}</template>
                </el-table-column>
                <el-table-column label="进度" width="160">
                    <template #default="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="人员" width="190">
                    <template #default="scope">{{ scope.row.installer.nickname }}</template>
                </el-table-column>
                <el-table-column label="联系方式" width="220">
                    <template #default="scope">{{ scope.row.installer.mobile }}</template>
                </el-table-column>
                <!--<el-table-column label="施工详情" width="300">
                    <template #default="scope">{{ scope.row.address }}</template>
                </el-table-column> -->

                <el-table-column label="开始时间" width="220">
                    <template #default="scope">{{ dayjs(scope.row.start).format('YYYY-MM-DD:HH') }}</template>
                </el-table-column>
                <el-table-column label="完成时间" width="200">
                    <template #default="scope">{{ dayjs(scope.row.end_time).format('YYYY-MM-DD:HH') }}</template>
                </el-table-column>
                <el-table-column label="备注" width="150">
                    <template #default="scope">{{ scope.row.notes }}</template>
                </el-table-column>

                <el-table-column label="状态" width="180">
                    <template #default="scope">{{ scope.row.status }}</template>
                </el-table-column>
                <!-- <el-table-column label="现场图片" width="100">
                    <template #default="scope">{{ scope.row.img }}</template>
                </el-table-column> -->

                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="changeSchedule">修改</el-button>
                        <el-button link type="primary" size="small" v-if="scope.row.status.trim() !== '已处理'"
                            @click="allocation">分配</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 服务评价 -->
        <div class="evaluate" v-if="orderStatus == '已完成'">
            <p>服务评价</p>
            <el-divider />
            <div class="mark">
                <p>服务打分 :</p><el-rate v-model="mark" allow-half disabled />
            </div>
            <div class="imgEvaluate">
                <p>{{ orderInfo.evaluation_content }}</p>
                <template v-if="orderInfo.order_detail">
                    <div v-for="item in orderInfo.order_detail" style="display:inline-block">
                        <img :src="item.img.url" alt=""
                            style="height: 160px;width: 200px;margin-right: 20px; object-fit: cover">
                    </div>
                </template>


            </div>
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


//返回订单管理
const router = useRouter()
const handleClick = () => {
    router.push({ name: 'orderManagement', })
}
//跳转分配
const allocation = () => {
    router.push({ name: 'orderAllocation', query: { id: route.query.id } })
}

//获取订单编号
const route = useRoute();
console.log(route.query.id);
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
    //订单状态
    orderStatus.value = orderInfo.value.process_status
    // 评分
    mark.value = orderInfo.value.evaluation_star
    console.log(order);
}
searchInfo()


//订单状态
const orderStatus = ref('')
//评分
const mark = ref(4)
//结束订单弹框 
const centerDialogVisible = ref(false)
//结束订单操作
const finish = () => {
    centerDialogVisible.value = false
    orderStatus.value = '已完成'
    //将数据库中的状态改成已完成
    async function setStatus() {
        const status = await mdapi.nativeMutation({
            operation: "update_order",
            where: {
                id: { _eq: route.query.id },
            },
            _set: {
                process_status: "已完成"
            }
        })
    }
    setStatus()
}

//订单信息
const orderInfo = ref({})

//订单进度信息
const scheduleData = ref([])

//修改订单进度
const changeSchedule = () => {
    console.log("changeSchedule");
}
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


</script>
  
<style lang="scss" scoped>
// 订单详情
// 订单操作
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

.controls {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 107px 0px 107px;

    .controls_left {
        display: flex;
        align-items: center;

        p {
            margin: 0px 27px 0px 0px
        }

        .el-button:hover {
            background-color: #67c23a;
            border-color: #67c23a;
        }
    }
}

//分割线
.el-divider--horizontal {
    width: 92%;
    margin: 20px auto;
}

//订单信息
.orderInfo {
    font-size: 15px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 109px;


    p {
        margin-right: 200px;
        width: 350px;
    }
}

// 订单进度
.schedule {
    p {
        font-size: 16px;
        margin-left: 107px;
    }
}

//服务评价
.evaluate {
    margin-top: 40px;
    font-size: 16px;

    p {
        font-size: 16px;
        margin-left: 107px;
    }

    .mark {
        font-size: 14px;
        display: flex;
        align-items: center;


    }

    .imgEvaluate {
        font-size: 16px;
        margin-left: 110px;
        height: 100%;
        width: 100%;

        p {
            margin-left: 0px;

        }
    }
}
</style>
