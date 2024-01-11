<template>
    <Menu prop1="1"></Menu>
    <p class="title">用户管理</p>
    <div class="management">
        <div class="search" :v-model="formInline1">
            <el-input v-model="formInline1.nickname" placeholder="请输入用户名称" clearable />
            <el-button type="primary" class="searchbtn" @click="search">搜索</el-button>
            <el-button class="resetbtn" @click="reset">重置</el-button>
        </div>
        <div class="newuser">
            <el-button type="primary" @click="dialogFormVisible = true">新增用户</el-button>
            <!-- 新增用户表单 -->
            <el-dialog v-model="dialogFormVisible" title="账户信息" v-show="showChange">
                <el-form :model="form">
                    <div class="one">
                        <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.nickname" autocomplete="off" />
                            <el-form-item label="用户账号" :label-width="formLabelWidth" prop="account">
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
                            <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
                                <el-input v-model="form.mobile" autocomplete="off" />
                            </el-form-item>
                        </el-form-item>
                    </div>
                    <div class="three">
                        <el-form-item label="工种" :label-width="formLabelWidth" prop="work">
                            <el-input v-model="form.work" autocomplete="off" />
                            <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                                <el-input v-model="form.status" autocomplete="off" />
                            </el-form-item>
                        </el-form-item>
                    </div>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="adduser()">确认</el-button>
                    </span>
                </template>
            </el-dialog>

        </div>
    </div>
    <div class="user">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column label="头像" width="190">
                <template #default="scope">
                    <el-avatar :size="50" :src="scope.row.avatar?.url">
                    </el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="用户名称" width="190">
                <template #default="scope">{{ scope.row.nickname }}</template>
            </el-table-column>
            <el-table-column label="账号" width="300">
                <template #default="scope">{{ scope.row.account }}</template>
            </el-table-column>
            <el-table-column label="联络电话" width="220">
                <template #default="scope">{{ scope.row.mobile }}</template>
            </el-table-column>
            <el-table-column label="待处理订单数" width="170">
                <template #default="scope">{{ scope.row.ordertodo }}</template>
            </el-table-column>
            <el-table-column label="已完成订单数" width="200">
                <template #default="scope">{{ scope.row.ordercomplete }}</template>
            </el-table-column>
            <el-table-column property="status" label="状态" show-overflow-tooltip>
                <template #default="scope">{{ scope.row.status }}</template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="220">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="changeSchedule(scope)">修改</el-button>
                    <el-button link type="primary" size="small">禁用</el-button>
                    <el-button link type="primary" size="small" @click="deleteUser(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑表单 -->
        <el-dialog v-model="dialogFormVisible1" title="编辑账户信息" v-show="showChange">
            <el-form :model="changeForm">
                <div class="one">
                    <el-form-item label="用户姓名" :label-width="formLabelWidth">
                        <el-input v-model="changeForm.nickname" autocomplete="off" />
                        <el-form-item label="用户账号" :label-width="formLabelWidth" prop="account">
                            <el-input v-model="changeForm.account" autocomplete="off" />
                        </el-form-item>
                    </el-form-item>
                </div>
                <div class="two">
                    <el-form-item label="用户性别" :label-width="formLabelWidth">
                        <el-radio-group v-model="radio1" class="radio">
                            <el-radio label="1" size="large">男</el-radio>
                            <el-radio label="2" size="large">女</el-radio>
                        </el-radio-group>
                        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
                            <el-input v-model="changeForm.mobile" autocomplete="off" />
                        </el-form-item>
                    </el-form-item>
                </div>
                <div class="three">
                    <el-form-item label="工种" :label-width="formLabelWidth" prop="work">
                        <el-input v-model="changeForm.work" autocomplete="off" />
                        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
                            <el-input v-model="changeForm.status" autocomplete="off" />
                        </el-form-item>
                    </el-form-item>
                </div>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="changeButton">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

    <div class="paging">
        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[2, 4, 6, 8]" small
            background layout="total, prev, pager, next,sizes, jumper" :total="tableData.length"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { ElTable } from 'element-plus'
import Menu from '../components/Menu.vue';
//新增用户表单
const dialogFormVisible = ref(false)
const dialogFormVisible1 = ref(false)
const formLabelWidth = '140px'
const form = reactive({
    nickname: '',
    account: '',
    work: '',
    mobile: '',
    status: '',
    id: ''
})
//失败时回退的图片
const errorHandler = () => true


//表单数据
//新增用户性别
const radio1 = ref('1')


//表格数据
const multipleTableRef = ref()
const multipleSelection = ref([])

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

//表单数据
const formInline1 = reactive({
    id: null,
    region: null,
    data: null,
    status: null,
    nickname: null,
    avatar: { id: null, url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" }
})
//mdapi
import zionMdapi1 from 'zion-mdapi';
const mdapi1 = zionMdapi1.init({
    url: "https://zion-app.functorz.com/zero/dK5wjNzKN12/api/graphql-v2",
    actionflow_id: "57a5b125-4af3-472f-b79d-f23c49c3831b",
})

//获取所有用户数据
const tableData = ref([])
async function getInfo1() {
    const installer = await mdapi1.nativeQuery({
        model: "installer",
        fields: [
            "id",
            "nickname",
            "mobile",
            "avatar{url id}",
            "account",
            "status",
            "work"
        ]
    }).catch((e) => {
        console.log(e);
    })
    tableData.value = installer
    console.log(tableData.value);
    console.log(tableData.value[2].avatar.url);
    console.log(tableData.value[1]);
}
getInfo1()

//重置按钮
const reset = () => {
    getInfo1()
}
// 搜索按钮
const search = () => {
    searchInfo()
}
//删除用户
const deleteUser = (scope) => {
    const id = scope.row.id
    async function deleteO() {
        await mdapi1.nativeMutation({
            operation: "delete_installer",
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
//搜索某些数据
async function searchInfo() {
    const installer = await mdapi1.nativeQuery({
        model: "installer",
        where: {
            id: { _eq: formInline1.id },
            nickname: { _eq: formInline1.nickname },
            account: { _eq: formInline1.account }
        },
        fields: [
            "mobile",
            "id",
            "nickname",
            "account",
            "avatar{url id}",
            "status"
        ]
    }).catch((e) => {
        console.log(e);
    })
    tableData.value = installer
    console.log(tableData.value);
}
//要修改的用户的ID
const userid = ref()
//修改表单进度
const showChange = ref(false)
//修改用户信息
const changeButton = async () => {
    dialogFormVisible1.value = false
    mdapi1.mutation({
        operation: "update_installer",
        where: {
            id: { _eq: userid.value }
        },
        _set: {
            nickname: changeForm.nickname,
            mobile: changeForm.mobile,
            account: changeForm.account
        }
    })
    showChange.value = false
    getInfo1();
    location.reload();
}
//取消
const changeCancel = () => {
    showChange.value = false
}
//修改用户信息
const changeForm = reactive({
    nickname: '',
    work: '',
    account: '',
    mobile: '',
    status: ''
})
//点击表格中的修改按钮
const changeSchedule = (scope) => {
    dialogFormVisible1.value = true
    changeForm.id = scope.row.id
    changeForm.account = scope.row.account
    changeForm.nickname = scope.row.nickname
    changeForm.mobile = scope.row.mobile
    changeForm.status = scope.row.status
    changeForm.work = scope.row.work
    showChange.value = true
    userid.value = scope.row.id
    console.log(userid.value)
    console.log(scope.row.avatar.url)

}
//添加用户
const adduser = async () => {
    dialogFormVisible.value = false;
    mdapi1.mutation({
        operation: "insert_installer",
        objects: [{
            nickname: form.nickname,
            account: form.account,
            mobile: form.mobile,
            status: form.status,
            avatar: form.avatar,
            work: form.work
        }],
    })
    showChange.value = false
    getInfo1()
    //刷新页面
    location.reload()
}
//分页器
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