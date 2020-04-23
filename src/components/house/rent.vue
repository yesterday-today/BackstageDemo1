<template>
    <div>
        <Table border ref="selection" :data="currentData" :columns="tableColumns1"></Table>
        <div class="button">
            <Button @click="handleSelectAll(true)" class="all">设置全选</Button>
            <Button @click="handleSelectAll(false)" class="cancel">取消全选</Button>
            <Button @click="save" class="total">全部通过</Button>
        </div>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="count" :current="currentPage" @on-change="changePage"></Page>
            </div>
        </div>
        <div class="modal">
            <Modal
            width=300
                v-model="modal1"
                title="审核"
                @on-ok="ok"
                @on-cancel="cancel">
                <p>您确定全部审核通过吗？</p>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        props:['currentData','count','currentPage'],
        data () {
            return {
                modal1:false,
                tableColumns1: [
                    // {
                    //     title: 'name',
                    //     key: 'title',
                    //     width:300,
                    //     render: (h, params) => {
                    //         return h('a',{
                    //         on:{
                    //             click:()=>{
                    //                 this.handleDetail(params)
                    //             }
                    //         }
                    //         },params.row.title);
                    //     }
                    // },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '发布者姓名',
                        key: 'username'
                    },
                    {
                        title: '发布内容',
                        key: 'userContent',
                        // width:300,
                        tooltip:true,
                    },
                    {
                        title: '发布时间',
                        key: 'uploadTime',
                        sortable: true
                    },
                    {
                        title: '是否通过',
                        key: 'status',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row.id)
                                        }
                                    }
                                }, '审核'),
                            ]);
                        },
                        filters: [
                            {
                                label: '未审核',
                                value: 1
                            },
                            {
                                label: '审核通过',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.status =1;
                            } else if (value === 2) {
                                return row.status=2;
                            }
                        }
                    }
                ],
            }
        },
        methods: {
            changePage (e) {
                console.log(e);
                this.$emit("changePage",e);
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            save(){
                this.modal1=true;
            },
            handleDetail(){

            },
            show (index) {

                console.log(index)
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            }
        }
    }
</script>

<style scoped>
.button{
    padding-top: 10px;
    padding-left: 10px;
}
.ivu-table-column-X0Wo0O content{
    background: pink !important;
}
.total{
        background: #0fec2c;
        color: #fff;
    }

</style>
