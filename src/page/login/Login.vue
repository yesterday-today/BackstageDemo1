<template>
    <div class="login">
        <div class="wrap">
            <p class="loginText">登录</p>
            <span class="line"></span>
            <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
                <FormItem prop="user" class="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password" class="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem class="signin">
                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    this.$axios.get("api/login").then(res=>{
                        if(res.status==200){
                            if(valid&&this.formInline.user==res.data[0].name&&this.formInline.password==res.data[0].password){
                                this.$Message.success('Success!');
                                this.$router.replace('/index')
                            }
                            else{
                                this.$Message.error('Fail!');
                            }
                        }
                    })
                })
            },
            examin(){
                
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>
.loginText{
    line-height: 50px;
    font-size: 30px;
    padding: 20px 0 0 30px;
}
.line{
    width: 60px;
    height: 5px;
    background: #131574;
    display: block;
    margin-left: 30px;
}
.login{
    position:fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:url(../../../static/img/background.jpg);
    background-size:100% 100%;
}
.form{
    width: 80%;
    margin:0 auto;
}
.wrap{
    width: 350px;
    height: 380px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 2px;
}
.user{
    padding-left: 10px;
    padding-top: 30px;
}
.password{
    padding-left: 10px;
    padding-top: 20px;
}
.signin{
    float: right;
}
</style>