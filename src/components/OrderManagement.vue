<template>
    <p class="title">订单管理 </p>
    <!-- 订单管理 -->
    <div class="management">
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
                    <el-button link type="primary" size="small" @click="allocation">分配</el-button>
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

const onSubmit = () => {
    console.log('submit!')
}

//表格数据
const multipleTableRef = ref()
const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}
//查看订单详情
const router = useRouter()
const handleClick = () => {
    router.push({ name: 'orderDetails', })
}
//跳转分配
const allocation = () => {
    router.push({ name: 'orderAllocation', })
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

</script>
  
<style lang="scss" scoped>
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
</style>
