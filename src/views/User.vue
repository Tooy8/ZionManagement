<template>
    <Menu prop1="1"></Menu>
    <p class="title">用户管理</p>
    <div class="management">
        <div class="search">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
            <el-button type="primary" class="searchbtn">搜索</el-button>
            <el-button class="resetbtn">重置</el-button>
        </div>
        <div class="newuser">
            <el-button type="primary" @click="dialogFormVisible = true">新增用户</el-button>
            <!-- 新增用户表单 -->
            <el-dialog v-model="dialogFormVisible" title="账户信息">
                <el-form :model="form">
                    <div class="one">
                        <el-form-item label="用户姓名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off" />

                            <el-form-item label="用户账号" :label-width="formLabelWidth">
                                <el-input v-model="form.account" autocomplete="off" />
                            </el-form-item>
                        </el-form-item>
                    </div>
                    <div class="two">
                        <el-form-item label="用户性别" :label-width="formLabelWidth">

                            <el-radio-group v-model="radio1" class="radio">
                                <el-radio label="1" size="large">男</el-radio>
                                <el-radio label="2" size="large">女</el-radio>
                            </el-radio-group>


                            <el-form-item label="联系电话" :label-width="formLabelWidth">
                                <el-input v-model="form.phone" autocomplete="off" />

                            </el-form-item>
                        </el-form-item>
                    </div>
                    <div class="three">
                        <el-form-item label="工种" :label-width="formLabelWidth">
                            <el-input v-model="form.work" autocomplete="off" />

                            <el-form-item label="状态" :label-width="formLabelWidth">
                                <el-input v-model="form.status" autocomplete="off" />

                            </el-form-item>
                        </el-form-item>
                    </div>


                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
                    </span>
                </template>
            </el-dialog>

        </div>
    </div>

    <div class="user">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">


            <el-table-column label="头像" width="190">
                <template #default="scope">{{ scope.row.orderNum }}</template>
            </el-table-column>
            <el-table-column property="name" label="客户姓名" width="140" />
            <el-table-column label="用户名称" width="190">
                <template #default="scope">{{ scope.row.number }}</template>
            </el-table-column>
            <el-table-column label="账号" width="300">
                <template #default="scope">{{ scope.row.address }}</template>
            </el-table-column>
            <el-table-column label="联络电话" width="220">
                <template #default="scope">{{ scope.row.appointment }}</template>
            </el-table-column>
            <el-table-column label="待处理订单数" width="170">
                <template #default="scope">{{ scope.row.content }}</template>
            </el-table-column>
            <el-table-column label="已完成订单数" width="200">
                <template #default="scope">{{ scope.row.orderTime }}</template>
            </el-table-column>

            <el-table-column property="status" label="状态" show-overflow-tooltip />

            <el-table-column fixed="right" label="操作" width="220">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">修改</el-button>
                    <el-button link type="primary" size="small">禁用</el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>

    <div class="paging">
        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[2, 4, 6, 8]" small
            background layout="total, prev, pager, next,sizes, jumper" :total="40" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'
import Menu from '../components/Menu.vue';
/* import { Pagination } from 'element-plus' */
/* export default{
    components:{
        [Pagination.name]:Pagination
    },
    data(){
        return {
            dataList:[],
            total:0,
            currentPage:1,
            pagesize:10
        };
    },
    methods:{
        f
    }

} */
//新增用户表单
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
//表单数据
const formInline = reactive({
    user: '',
    region: '',
    date: '',
    status: ''
})
//新增用户性别
const radio1 = ref('1')

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
const tableData1 = [
    {
        img: '1111',
        name: '',
        nickname: '',
        account: '',
        phone: '',
        ordernumber: '',
        ordercomplete: '',
        status: ''
    },
    {
        img: '1111',
        name: '',
        nickname: '',
        account: '',
        phone: '',
        ordernumber: '',
        ordercomplete: '',
        status: ''
    }
]
const initGetUserList = async () => {
    const res = await initGetUserList()
}
</script>
  
<style scoped>
.management {
    display: flex;
    justify-content: space-between;
    margin: 0 80px;
}

.search {
    display: flex;
    width: 380px;
}

.title {
    font-size: 17px;
    margin-top: 20px;
    margin-bottom: 50px;
    width: 80px;
    height: 26px;
    line-height: 25px;
    font-weight: bold;
    margin-left: 80px;
}

.user {
    position: relative;

    margin: 0 80px;
}

.paging {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%);
}

/* 新增用户表单 */
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 200px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.radio {
    margin-right: 100px;
}
</style>