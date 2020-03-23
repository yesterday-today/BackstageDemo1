<template>
    <Modal
        width="800px"
        :value="true"
        title="房源详情"
        :footer-hide="true"
        @on-cancel="cancel">
        <Collapse v-model="value1" class="collapse">
            <Panel name="1">
                基本信息
                <div slot="content">
                    <ul>
                        <li>
                            房屋类型：{{detailData.size}}-{{detailData.area}}
                        </li>
                        <li>
                            价格：{{detailData.price}}
                        </li>
                        <li>
                            联系人：{{detailData.details.linkPerson[0].name}}
                        </li>
                        <li>
                            联系电话：{{detailData.details.linkPerson[0].phone}}
                        </li>
                    </ul>
                </div>
            </Panel>
            <Panel name="1">
                房源描述
                <div slot="content">
                    <ul>
                        <li v-for="(item,index) in detailData.details.message" :key="index">
                            {{item}}
                        </li>
                    </ul>
                </div>
            </Panel>
            <Panel name="1">
                配套设施
                <div slot="content">
                    <ul>
                        <li v-for="(item,index) in detailData.details.facilities" :key="index" v-if="item.status==2">
                            {{item.facility}}
                        </li>
                    </ul>
                </div>
            </Panel>
        </Collapse>
    </Modal>
</template>
<script>
    export default {
        props:['detailData'],
        data () {
            return {
                value1: '1',
            }
        },
        methods: {
            cancel () {
                this.$emit("onCancel");
            }
        }
    }
</script>

<style scoped>
ul{
    width: 100%;
    overflow: hidden;
}
li{
    width:50%;
    height:35px;
    line-height:35px;
    float: left;
    list-style-type:none;
}
</style>