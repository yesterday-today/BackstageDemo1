<template>
    <div class="index">
        <div class="layout">
            <Layout>
                <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1" theme="dark" width="auto" :class="menuitemClasses" @on-select="select">
                        <MenuGroup title="房源">
                            <MenuItem name="1">
                                <Icon type="ios-home" />
                                租房信息
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="ios-build" />
                                房源审核
                            </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="美食">
                            <MenuItem name="4">
                                <Icon type="logo-freebsd-devil" />
                                汉堡
                            </MenuItem>
                            <MenuItem name="5">
                                <Icon type="ios-pizza" />
                                面包
                            </MenuItem>
                            <MenuItem name="6">
                                <Icon type="ios-restaurant" />
                                面食
                            </MenuItem>
                            <MenuItem name="7">
                                <Icon type="ios-nutrition" />
                                水果
                            </MenuItem>
                            <MenuItem name="8">
                                <Icon type="md-restaurant" />
                                主食
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </Sider>
                <Layout>
                    <Header :style="{padding: 0}" class="layout-header-bar">
                        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    </Header>
                    <Content :style="{margin: '20px', background: '#fff', minHeight: '530px'}">
                        <div class="search">
                            <div class="select" v-if="selectIndex==1">
                                <Select v-model="city" prefix="ios-home" style="width:100px" @on-select="onSelect">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                            <Input search enter-button placeholder="请输入id进行查询" @on-search="onSearch"/>
                        </div>
                        <House
                            :currentData="currentData"
                            :count="count"
                            @changePage="changePage"
                            :currentPage="currentPage"
                            @goDetail="goDetail"
                            v-if="selectIndex==1"
                        >
                        </House>
                        <Rent 
                            :currentData="currentData"
                            :count="count"
                            @changePage="changePage"
                            @onOk="onOk"
                            :currentPage="currentPage"
                            v-if="selectIndex==2">
                        </Rent>
                        <Food
                            :currentData="currentData"
                            :count="count"
                            @changePage="changePage"
                            :currentPage="currentPage"
                            @goDetail="goDetail"
                            v-if="selectIndex!=1&&selectIndex!=2"
                        >
                        </Food>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="layout-footer-center">2019-2020 &copy; Background development</Footer>
        </div>
            <div v-if="modal==true">
                <houseDetail @onCancel="onCancel" :detailData="detailData"></houseDetail>
            </div>
    </div>
</template>

<script>
import axios from 'axios';
import House from '../../components/house/index';
import Rent from '../../components/house/rent';
import houseDetail from '../../components/house/detail';
import Food from '../../components/food/index';


export default {
  name: 'home',
  components:{House,Rent,houseDetail,Food},
  data () {
    return {
        isCollapsed: false,
        selectIndex:1,
        data:[],
        currentPage:1,
        count:0,
        currentData:[],
        modal:false,//true为显示详情
        detailData:[],//详情数据
        searchId:0,//搜索id
        cityList: [
            {
                value: '厦门',
                label: '厦门'
            },
            {
                value: '泉州',
                label: '泉州'
            },
            {
                value: '福州',
                label: '福州'
            },
            {
                value: '漳州',
                label: '漳州'
            }
        ],
        city:'厦门'
        
    }
  },
  methods: {
    getData(){
        if(this.selectIndex==1){
            axios.get("/house/city="+this.city)
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==2){
            axios.get("/getRents")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==4){
            axios.get("/food/hambuger")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==5){
            axios.get("/food/bread")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==6){
            axios.get("/food/noodle")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==7){
            axios.get("/food/fruit")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==8){
            axios.get("/food/staple")
            .then(this.getDataSuccess)
        }
    },
    getDataSuccess(res){
        console.log(res)
        this.data=res.data;
        this.count=res.data.length,
        this.getCurrentData(this.currentPage);
    },
    getCurrentData(page){
        if(this.selectIndex==1){
          for(let i=page;i<=page;i++){
            for(let j=0+(i-1)*10;j<10*i&&j<this.count;j++){
                this.currentData.push(
                    {
                        id:this.data[j].id,
                        title:this.data[j].title,
                        size:this.data[j].type,
                        area:this.data[j].size,
                        price:this.data[j].price,
                        address:this.data[j].area+'-'+this.data[j].address,
                        details:{
                            message:this.data[j].detail[0].news,
                            linkPerson:this.data[j].detail[0].link,
                            facilities:this.data[j].detail[0].facilities,
                        }
                    }
                );
            }
          }
        }
        else if(this.selectIndex==2){
            for(let i=page;i<=page;i++){
            for(let j=0+(i-1)*10;j<10*i&&j<this.count;j++){
                this.currentData.push(
                    {
                        id:this.data[j].id,
                        userName:this.data[j].userName,
                        message:this.data[j].message,
                        uploadTime:this.data[j].uploadTime,
                        status:this.data[j].status,
                        _disabled:this.data[j].status==1?true:false,
                    }
                );
            }
          }
          console.log(this.currentData)
        }
        else{
          for(let i=page;i<=page;i++){
            for(let j=0+(i-1)*10;j<10*i&&j<this.count;j++){
                this.currentData.push(
                    this.data[j]
                );
            }
          }
        }
    },
    collapsedSider () {
        this.$refs.side1.toggleCollapse();
    },
    //选择地区
    onSelect(e){
        console.log(e)
        this.city=e.value;
        this.currentPage=1;
        this.currentData=[];
        this.getData();
    },
    select(e){
        this.selectIndex=e;
        this.currentPage=1;
        this.currentData=[];
        this.getData();
    },
    //更换页数
    changePage(e){
        this.currentPage=e;
        this.currentData=[];
        this.getCurrentData(this.currentPage);
    },
    //查看详情
    goDetail(obj){
        this.modal=true;
        this.detailData=obj;
    },
    //点击审核确认
    onOk(examineData){
        //当点击全部审核时
        if(examineData.length>1){
            for(var i=0;i<examineData.length;i++){
                axios.get(`/updateRent/id=${examineData[i].id}?status=1`).then(res=>{
                    this.currentData=[];
                     if(res.data='修改成功'){
                    }
                })
            }
            setTimeout(()=>{
                this.getData();
            },500)
        }
        else{
            if(examineData.status==2){
                this.currentData=[];
                axios.get(`/updateRent/id=${examineData.id}?status=1`).then(res=>{
                    this.getData();
                })
            }
        }
        
    },
    onCancel(){
        this.modal=false;
    },
    onSearch(e){
        this.searchId=e-1;
        this.currentPage=1;
        if(this.searchId>=0&&this.selectIndex==1){
            this.currentData=[];
            this.currentData.push(
                {
                    id:this.data[this.searchId].id,
                    title:this.data[this.searchId].title,
                    size:this.data[this.searchId].type,
                    area:this.data[this.searchId].size,
                    price:this.data[this.searchId].price,
                    address:this.data[this.searchId].area+'-'+this.data[this.searchId].address,
                    details:{
                        message:this.data[this.searchId].detail[0].news,
                        linkPerson:this.data[this.searchId].detail[0].link,
                        facilities:this.data[this.searchId].detail[0].facilities,
                    }
                }
            );
        }
        else if(this.searchId>=0&&this.selectIndex==2){
            this.currentData=[];
            var id=Number(this.searchId)+1;
            axios.get("/getRent/id="+id).then(res=>{
                this.currentData.push(
                    {
                        id:res.data.id,
                        userName:res.data.userName,
                        message:res.data.message,
                        uploadTime:res.data.uploadTime,
                        status:res.data.status,
                        _disabled:res.data.status==1?true:false,
                    }
                );
            })
        }
        else if(this.searchId>=0&&this.selectIndex!=1&&this.selectIndex!=2){
            this.currentData=[];
            this.currentData.push(this.data[this.searchId]);
        }
        else{
            this.getCurrentData(this.currentPage);
        }
    }
  },
  mounted(){
      this.getData();
  },
  computed:{
    rotateIcon () {
        return [
            'menu-icon',
            this.isCollapsed ? 'rotate-icon' : ''
        ];
    },
    menuitemClasses () {
        return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    }
  }
}
</script>

<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
.layout-footer-center{
    text-align: center;
    background: #fff;
}
.search{
    padding: 20px 200px;
    display: flex;
}
.select{
    padding-right: 50px;
    display: inline;
}
</style>
