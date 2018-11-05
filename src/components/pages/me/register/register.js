/**
 * Created by guangqiang on 2017/11/14.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView} from 'react-native'
import {BaseComponent} from '../../../base/baseComponent'
import {Icon, Toast, deviceInfo, commonStyle, storage} from '../../../../utils'
import {Actions} from 'react-native-router-flux'
import { Button } from 'react-native-elements';
import action from '../../../../actionCreators/me'

export default class Register extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      secret: true,
      verifyCode: '',
      pwd: '',
      loading: false,
      nickName: '',
      name: '',
      code: ''
    }
  }

  navigationBarProps() {
    return {
      title: '注册',
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.white
      },
      titleStyle: {
        color: commonStyle.white
      },
      navBarStyle: {
        backgroundColor: commonStyle.themeColor,
        borderBottomWidth: 0,
      }
    }
  }

  renderInput() {
    return (
      <View style={{alignItems: commonStyle.center, paddingHorizontal: 10, marginTop: 10, backgroundColor: commonStyle.white}}>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor}}>
          <Text style={{color: '#646464', marginRight: 10, fontSize: 15}}>邮箱</Text>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14}}
            placeholder={'请输入邮箱'}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({name: text})
            }}
            underlineColorAndroid='transparent'
            value={this.state.name}
          />
        </View>

        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor}}>
          <Text style={{color: '#646464', marginRight: 10, fontSize: 15}}>昵称</Text>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14}}
            placeholder={'请输入昵称'}
            onChangeText={text => {
              //text = text.replace(/ /g, '_')
              this.setState({nickName: text})
            }}
            underlineColorAndroid='transparent'
            value={this.state.nickName}
          />
        </View>

        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor}}>
          <Text style={{color: '#646464', marginRight: 10, fontSize: 15}}>密码</Text>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14}}
            secureTextEntry={this.state.secret}
            placeholder={'6-20位字母、数字、符号'}
            onChangeText={text => {
              //text = text.replace(/ /g, '_')
              this.setState({pwd: text})
            }}
            underlineColorAndroid='transparent'
            value={this.state.pwd}
          />
        </View>
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor}}>
          <Text style={{color: '#646464', marginRight: 10, fontSize: 15}}>推荐人</Text>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14}}
            placeholder={'请输入推荐人编号'}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({code: text})
            }}
            underlineColorAndroid='transparent'
            value={this.state.code}
          />
        </View>
      </View>
    )
  }

  submit() {
    this.setState({
      loading: !this.state.loading
    })
    let params = {}
    params.email = this.state.name
    params.code = this.state.code
    params.passworld = this.state.pwd
    params.nickName = this.state.nickName

    /*
      先注释掉验证，用一些假数据
    */
    /*
    if(params.name ==""){
      Toast.showError("请输入邮箱");
      setTimeout(()=>{
        this.setState({
          loading: !this.state.loading
        })
      },10)
    }
    if(params.nickName ==""){
      Toast.showError("请填写昵称");
      setTimeout(()=>{
        this.setState({
          loading: !this.state.loading
        })
      },10)
      return false;
    }
    if(params.code ==""){
      Toast.showError("请填写推荐码");
      setTimeout(()=>{
        this.setState({
          loading: !this.state.loading
        })
      },10)
      return false;
    }
    if(params.pwd ==""){
      Toast.showError("请输入密码");
      setTimeout(()=>{
        this.setState({
          loading: !this.state.loading
        })
      },10)
      return false;
    }


    Promise.resolve(action.register(params)).then(response => {
      if(!response.result.state){
        Toast.showError(response.result.message);
        setTimeout(()=>{
          this.setState({
            loading: !this.state.loading
          })
        },300)
        return false;
      }

      //登录成功，存储用户数据
      storage.save('userInfo', response.result);
      this.props.callback && this.props.callback('login')
      Toast.showSuccess('登录成功', () => Actions.pop())
        // storage.save('userInfo', params)
  })

  */

    //登录成功，存储用户数据
    let data = {
      'email': 'jun880529@163.com',
      'nickName': '大包子',
      'code': '1234',
      'type': 0,
      'endDate': '1543968000000'
    }
    storage.save('userInfo', data);
    this.props.callback && this.props.callback('login')
    Toast.showSuccess('注册成功', () => Actions.pop())


    
  }

  renderRegisterBtn() {
    return (
      <View style={{marginTop: 40, marginHorizontal: 10}}>
        <Button
          title="注册"
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          buttonStyle={{
            backgroundColor: commonStyle.themeColor,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 20
          }}
          loading={this.state.loading}
          disabled={this.state.loading}
          onPress= {()=>this.submit()}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInput()}
          {this.renderRegisterBtn()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.bgColor
  },
  registerBtn: {
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderRadius: 20,
    width:deviceInfo - 20,
    paddingVertical: 10,
    backgroundColor: commonStyle.themeColor,
    marginTop: 20
  }
})