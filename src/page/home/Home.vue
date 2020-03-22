<template>
    <div class="index">
        <div class="layout">
            <Layout>
                <Sider  ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
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
                        <House></House>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="layout-footer-center">2019-2020 &copy; Background development</Footer>
        </div>
    </div>
</template>

<script>
import House from '../../components/house/index'
export default {
  name: 'home',
  components:{House},
  data () {
    return {
        isCollapsed: false
    }
  },
  methods: {
    collapsedSider () {
        this.$refs.side1.toggleCollapse();
    }
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
