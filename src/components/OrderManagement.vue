<template>
    <p class="title" @click="check = false">订单管理 &nbsp;</p>
    <p class="title" v-if="check">| &nbsp;订单详情</p>
    <!-- 订单管理 -->
    <div class="management" v-if="!check">
        <!-- 搜索订单 -->
        <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单编号">
                    <el-input v-model="formInline.user" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="下单时间">
                    <el-date-picker v-model="formInline.date" type="date" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="订单类型">
                    <el-select v-model="formInline.region" placeholder="空调安装" clearable>
                        <el-option label="空调安装" value="shanghai" />
                        <el-option label="配地暖安装" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.status" placeholder="待分配" clearable>
                        <el-option label="待分配" value="shanghai" />
                        <el-option label="处理中" value="beijing" />
                        <el-option label="待评价" value="qwe" />
                        <el-option label="已完成" value="asd" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                    <el-button @click="onSubmit">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 订单表格 -->
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="订单编号" width="190">
                <template #default="scope">{{ scope.row.orderNum }}</template>
            </el-table-column>
            <el-table-column label="客户姓名" width="140">
                <template #default="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="联系方式" width="190">
                <template #default="scope">{{ scope.row.number }}</template>
            </el-table-column>
            <el-table-column label="安装地址" width="300">
                <template #default="scope">{{ scope.row.address }}</template>
            </el-table-column>
            <el-table-column label="预约时间" width="220">
                <template #default="scope">{{ scope.row.appointment }}</template>
            </el-table-column>
            <el-table-column label="订单内容" width="170">
                <template #default="scope">{{ scope.row.content }}</template>
            </el-table-column>
            <el-table-column label="下单时间" width="200">
                <template #default="scope">{{ scope.row.orderTime }}</template>
            </el-table-column>
            <el-table-column label="订单进度" show-overflow-tooltip>
                <template #default="scope">{{ scope.row.status }}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="220">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">查看</el-button>
                    <el-button link type="primary" size="small">分配</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <div class="paging">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[2, 4, 6, 8]"
                small background layout="total, prev, pager, next,sizes, jumper" :total="40" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>

    <!-- 订单详情 -->
    <div class="details" v-if="check">
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
                        <el-button link type="primary" size="small" v-if="scope.row.status !== '已完成'">分配</el-button>
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
                <img src="../assets/background.jpg" alt="" style="height: 200px;width: 200px;">
            </div>
        </div>
    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'

//控制显示管理还是详情
const check = ref(false)


//表单数据
const formInline = reactive({
    user: '',
    region: '',
    date: '',
    status: ''
})

const onSubmit = () => {
    console.log('submit!')
}

//表格数据
const multipleTableRef = ref()
const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}
const handleClick = () => {
    check.value = !check.value
}
const tableData = [
    {
        orderNum: '12345612345',
        name: '王刚',
        number: "13194210403",
        address: '四川省xx和平花园1单元202室内',
        appointment: "2016-05-08 16:00",
        content: '空调安装',
        orderTime: '2016-05-03',
        status: '已完成'
    },
    {
        orderNum: '65342112345',
        name: '小明',
        number: "13194210403",
        address: '湖南省xx和平花园1单元202室内',
        appointment: "2016-05-08 16:00",
        content: '配地暖安装',
        orderTime: '2016-05-03',
        status: '待分配'
    }
]

//分页器操作
const currentPage4 = ref(4)
const pageSize4 = ref(2)
const handleSizeChange = () => {
    console.log(1)
}
const handleCurrentChange = () => {
    console.log(2)
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
const mark = ref()
</script>
  
<style lang="scss">
.demo-form-inline {
    display: flex;

    justify-content: space-between;

    .el-input {
        --el-input-width: 220px;
    }
}

.title {
    font-size: 17px;
    margin-top: 0px;
    display: inline-block;
    cursor: pointer;
}

// 分页器
.management {
    position: relative;
    width: 100%;
    height: 80vh;
}

.paging {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%);
}

// 订单详情
// 订单操作
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
