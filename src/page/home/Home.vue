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
                        </MenuGroup>
                        <MenuGroup title="美食">
                            <MenuItem name="2">
                                <Icon type="logo-freebsd-devil" />
                                汉堡
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="ios-pizza" />
                                面包
                            </MenuItem>
                            <MenuItem name="4">
                                <Icon type="ios-restaurant" />
                                面食
                            </MenuItem>
                            <MenuItem name="5">
                                <Icon type="ios-nutrition" />
                                水果
                            </MenuItem>
                            <MenuItem name="6">
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
                        <House
                            :currentData="currentData"
                            :count="count"
                            @changePage="changePage"
                            :currentPage="currentPage"
                            @goDetail="goDetail"
                            v-if="selectIndex==1"
                        >
                        </House>
                        <Food
                            :currentData="currentData"
                            :count="count"
                            @changePage="changePage"
                            :currentPage="currentPage"
                            @goDetail="goDetail"
                            v-else
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
import houseDetail from '../../components/house/detail';
import Food from '../../components/food/index';


export default {
  name: 'home',
  components:{House,houseDetail,Food},
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

    }
  },
  methods: {
    getData(){
        if(this.selectIndex==1){
            axios.get("/api/house.json")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==2){
            axios.get("/api/hambuger.json")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==3){
            axios.get("/api/bread.json")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==4){
            axios.get("/api/noodle.json")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==5){
            axios.get("/api/fruit.json")
            .then(this.getDataSuccess)
        }
        else if(this.selectIndex==6){
            axios.get("/api/staple.json")
            .then(this.getDataSuccess)
        }
    },
    getDataSuccess(res){
        this.data=res.data;
        this.count=res.data.length,
        this.getCurrentData(this.currentPage);
        console.log(this.data)
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
        else{
            console.log("进去")
            console.log("hambuger",this.data)
          for(let i=page;i<=page;i++){
              console.log("page",page)
            for(let j=0+(i-1)*10;j<10*i&&j<this.count;j++){
                console.log(j)

                this.currentData.push(
                    this.data[j]
                );
            }
          }
          console.log("currentData",this.currentData)
        }
    },
    collapsedSider () {
        this.$refs.side1.toggleCollapse();
    },
    select(e){
        this.selectIndex=e;
        console.log(this.selectIndex)
        this.currentPage=1;
        console.log(this.page);
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
        console.log(obj)
        this.modal=true;
        this.detailData=obj;

    },
    onCancel(){
        this.modal=false;
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
</style>
