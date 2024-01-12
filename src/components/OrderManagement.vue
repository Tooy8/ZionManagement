<template>
    <div class="title">订单管理 </div>
    <!-- 订单管理 -->
    <div class="management">
        <!-- 搜索订单 -->
        <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单编号">
                    <el-input v-model="formInline.id" placeholder="请输入" clearable @clear="idClear" />
                </el-form-item>
                <el-form-item label="下单时间">
                    <!-- <el-date-picker v-model="formInline.date" type="month" placeholder="请输入" clearable
                        style="width: 280px;" /> -->
                    <el-date-picker v-model="formInline.date" type="daterange" range-separator="到"
                        start-placeholder="开始（必填）" end-placeholder="结束（必填）" />
                </el-form-item>

                <el-form-item label="订单内容">
                    <el-input v-model="formInline.region" placeholder="请输入" clearable @clear="regionClear" />
                </el-form-item>

                <!-- <el-form-item label="订单类型">
                    <el-select v-model="formInline.region" placeholder="空调安装" clearable style="width: 280px;">
                        <el-option label="空调安装" value="空调安装" />
                        <el-option label="配地暖安装" value="配地暖安装" />
                    </el-select>
                </el-form-item> -->
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.status" placeholder="预约中" clearable style="width: 280px;"
                        @clear="statusClear">
                        <el-option label="预约中" value="预约中" />
                        <el-option label="进行中" value="进行中" />
                        <el-option label="已完成" value="已完成" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 订单表格 -->
        <el-table :data="tableData.slice((currentPage4 - 1) * pageSize4, currentPage4 * pageSize4)"
            style="width: 100%;padding:20px 79px 0 79px;">
            <el-table-column label="订单编号" width="170">
                <template #default="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column label="客户姓名" width="140">
                <template #default="scope">{{ scope.row.consignee }}</template>
            </el-table-column>
            <el-table-column label="联系方式" width="170">
                <template #default="scope">{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column label="安装地址" width="300">
                <template #default="scope">{{ scope.row.address_detail }}</template>
            </el-table-column>
            <el-table-column label="预约时间" width="220">
                <template #default="scope">{{ dayjs(scope.row.appointment_time).format('YYYY-MM-DD HH:mm') }}</template>
            </el-table-column>
            <el-table-column label="订单内容" width="170">
                <template #default="scope">{{ scope.row.notes }}</template>
            </el-table-column>
            <el-table-column label="下单时间" width="170">
                <template #default="scope">{{ dayjs(scope.row.created_at).format('YYYY-MM-DD HH:mm') }}</template>
            </el-table-column>
            <el-table-column label="订单进度" width="120">
                <template #default="scope">{{ scope.row.process_status }}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="220">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="details(scope)">查看</el-button>
                    <el-button link type="primary" size="small" @click="allocation(scope)"
                        v-if="scope.row.process_status !== '已完成'">分配</el-button>
                    <el-button link type="primary" size="small" @click="deleteOrder(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <div class="paging">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[2, 4, 6, 8]"
                small background layout="total, prev, pager, next,sizes, jumper" :total="tableData.length"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs';

//表单数据
const formInline = reactive({
    id: null,
    region: null,
    date: null,
    status: null
})

// 订单数据
const tableData = ref([]);



//表格数据
const multipleTableRef = ref()
const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

//调用接口获取数据
import zionMdapi from 'zion-mdapi';
//mdapi
const mdapi = zionMdapi.init({
    url: "https://zion-app.functorz.com/zero/omOJrPx6KDl/api/graphql-v2",
    actionflow_id: "2e2bea0f-43c0-4844-9bd3-75a06c889da9",
})

//查看订单详情
const router = useRouter()
const details = (scope) => {
    router.push({ name: 'orderDetails', query: { id: scope.row.id } })
}
//跳转分配
const allocation = (scope) => {
    router.push({ name: 'orderAllocation', query: { id: scope.row.id } })
}

//删除订单
const deleteOrder = (scope) => {
    const id = scope.row.id
    async function deleteO() {
        await mdapi.nativeMutation({
            operation: "delete_order",
            //删除id等于当前id的
            where: { id: { _eq: id } }
        }).catch((e) => {
            console.log(e);
        })
    }
    deleteO()
    //刷新页面
    location.reload();
}


//获取所有订单数据
async function getInfo() {
    const order = await mdapi.nativeQuery({
        model: "order",
        fields: [
            "created_at",
            "id",
            "consignee",
            "phone",
            "address_detail",
            "appointment_time",
            "notes",
            "process_status"]
    }).catch((e) => {
        console.log(e);
    })
    tableData.value = order
    console.log(tableData.value);
}
getInfo()

// 清空输入框
const idClear = () => {
    formInline.id = null
}
const statusClear = () => {
    formInline.status = null
}
const regionClear = () => {
    formInline.region = null
}


//重置按钮
const reset = () => {
    getInfo()
    // 清空输入框
    formInline.id = null
    formInline.status = null
    // formInline.data = null
    formInline.region = null

}
// 搜索按钮
const search = () => {
    searchInfo()
}
//搜索某些数据
async function searchInfo() {
    //格式化时间
    const dateArray = formInline.date; // 获取日期数组
    const date1 = (dateArray && dateArray.length > 0) ? dateArray[0] : null; // 检查日期数组是否存在且不为空，若为空则设置为 null
    const date2 = (dateArray && dateArray.length > 0) ? dateArray[1] : null;

    const time1 = date1 ? dayjs(formInline.date[0]).format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ') : null;
    const time2 = date2 ? dayjs(formInline.date[1]).format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ') : null;
    const order = await mdapi.nativeQuery({
        model: "order",
        where: {
            id: { _eq: formInline.id },
            // created_at: { _eq: formInline.date },
            notes: { _eq: formInline.region },
            process_status: { _eq: formInline.status },
            _and: [
                { created_at: { _gt: time1 } },
                { created_at: { _lt: time2 } }
            ]
        },
        fields: [
            "created_at",
            "id",
            "consignee",
            "phone",
            "address_detail",
            "appointment_time",
            "notes",
            "process_status"]
    }).catch((e) => {
        console.log(e);
    })
    tableData.value = order
    console.log(tableData.value);
}


//分页器操作
const currentPage4 = ref(1)
const pageSize4 = ref(8)
const handleSizeChange = (size) => {
    pageSize4.value = size;
    console.log(pageSize4.value)
}
const handleCurrentChange = (currentPage) => {
    currentPage4.value = currentPage
    console.log(currentPage4.value)
}

</script>
  
<style lang="scss" scoped>
.demo-form-inline {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-left: 70px;

    .el-input {
        --el-input-width: 280px;
    }
}

.title {
    margin-left: 80px;
    margin-top: 30px;
    width: 80px;
    height: 26px;
    line-height: 25px;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    text-align: left;
    font-weight: 700;
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
