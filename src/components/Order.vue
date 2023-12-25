<template>
    <p class="title">订单管理</p>
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
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="订单编号" width="190">
            <template #default="scope">{{ scope.row.orderNum }}</template>
        </el-table-column>
        <el-table-column property="name" label="客户姓名" width="140" />
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

        <el-table-column property="status" label="订单进度" show-overflow-tooltip />

        <el-table-column fixed="right" label="操作" width="220">
            <template #default>
                <el-button link type="primary" size="small" @click="handleClick">查看</el-button>
                <el-button link type="primary" size="small">分配</el-button>
                <el-button link type="primary" size="small">删除</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'

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
    console.log('click')
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
        orderNum: '12345612345',
        name: '王刚',
        number: "13194210403",
        address: '四川省xx和平花园1单元202室内',
        appointment: "2016-05-08 16:00",
        content: '空调安装',
        orderTime: '2016-05-03',
        status: '已完成'
    }
]
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
}
</style>
