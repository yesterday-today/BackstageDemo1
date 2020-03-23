<template>
    <div>
        <Table :data="currentData" :columns="tableColumns1"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="count" :current="currentPage" @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['currentData','count','currentPage'],
        data () {
            return {
                tableColumns1: [
                    {
                        title: 'name',
                        key: 'title',
                        width:300,
                    },
                    {
                        title: 'price',
                        key: 'price',
                        render: (h, params) => {
                            return h('div',params.row.price+'元');
                        }
                    },
                    {
                        title: 'comment',
                        key: 'comment',
                        render: (h, params) => {
                            return h('div',params.row.comment+'人');
                        }
                    },
                    {
                        title: 'grade',
                        key: 'grade',
                        render: (h, params) => {
                            return h('div',params.row.grade+'分');
                        }
                    },
                    {
                        title: 'address',
                        key: 'address',
                        width:200,
                    }
                ],
            }
        },
        methods: {
            changePage (e) {
                this.$emit("changePage",e);
            },
        },
    }
</script>

