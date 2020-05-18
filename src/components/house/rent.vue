<template>
    <div>
        <Table border ref="selection"
            :data="currentData"
            :columns="tableColumns1"
            @on-selection-change="onChange"
            @on-select="onSelect"
            @on-select-all="onSelectAll"
            >
        </Table>
        <div class="button">
            <Button @click="handleSelectAll(true)" class="all">设置全选</Button>
            <Button @click="handleSelectAll(false)" class="cancel">取消全选</Button>
            <Button @click="allPass" class="total">全部通过</Button>
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
                <p>{{modalText}}</p>
            </Modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        props:['currentData','count','currentPage'],
        data () {
            return {
                modal1:false,
                modalText:'',
                examineData:[],
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
                        align: 'center',
                        disabled: true
                    },
                    {
                        title: '发布者姓名',
                        key: 'userName'
                    },
                    {
                        title: '发布内容',
                        key: 'message',
                        // width:300,
                        tooltip:true,
                    },
                    {
                        title: '发布时间',
                        key: 'uploadTime',
                        sortable: true,
                        render:function(h,params){
                            return h('div',new Date(params.row.uploadTime).toLocaleString().replace(/:\d{1,2}$/, ' '));
                        }
                    },
                    {
                        title: '是否通过',
                        key: 'status',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.status==1){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small',
                                            disabled:true
                                        },
                                        style: {
                                            marginRight: '5px',
                                        },
                                    }, '审核通过'),
                                ]);
                            }
                            else if(params.row.status==2){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.row)
                                            }
                                        }
                                    }, '未审核'),
                                ]);
                            }
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
                            if (value === 1&&row.status === 2) {
                                return row.status =2;
                            } else if (value === 2&&row.status === 1) {
                                return row.status=1;
                            }
                        }
                    }
                ],
            }
        },
        methods: {
            //改变页数
            changePage (e) {
                this.$emit("changePage",e);
            },
            handleSelectAll (status) {
                //当status状态为2时，则为管理员未审核过，可进行全选操作
                this.$refs.selection.selectAll(status);
            },
            //选中某一项触发
            onSelect(selection,row){
                console.log(selection);
                console.log(row);
            },
            //只要选中项发生变化时就会触发,输出为数组
            onChange(selection){
                console.log(selection);
            },
            //点击全选时触发
            onSelectAll(selection){
                this.examineData=selection;
            },
            //全部通过审核
            allPass(){
                this.modal1=true;
                this.modalText='您确定全部审核通过吗？';
            },
            show (value) {
                this.examineData=value;
                this.modal1=true;
                this.modalText='您确定审核通过吗？';
            },
            handleDetail(){

            },
            ok(){
                console.log(this.examineData);
                this.$emit('onOk',this.examineData);
                this.$Message.info('审核成功');
            },
            cancel () {
                this.$Message.info('取消审核');
            }
        },
        mounted(){
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
