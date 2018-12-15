/**
 * Created by guangqiang on 2017/11/14.
 */
import React from 'react'
import {View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, NativeModules, Platform, Alert} from 'react-native'
import {BaseComponent} from '../../../base/baseComponent'
import {Icon, deviceInfo, Toast, commonStyle, storage} from '../../../../utils'
import {Actions} from 'react-native-router-flux'
import {sharePlatform} from '../../../../constants/commonType'

import { Button } from 'react-native-elements';


import action from '../../../../actionCreators/me'


const LoginModule = NativeModules.loginModule


export default class Login extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      secret: true,
      loading: false
    }
  }

  navigationBarProps() {
    return {
      title: '登录',
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
      <View style={{marginTop: 10}}>
        <View style={{flexDirection: 'row', padding: 10, backgroundColor: commonStyle.white, borderBottomWidth: commonStyle.lineWidth, borderBottomColor: commonStyle.lineColor, alignItems: commonStyle.center}}>
          <Icon name={`oneIcon|user_name_o`} size={20} color={commonStyle.themeColor}/>
          <TextInput
            style={{flex: 1, marginHorizontal: 10, fontSize: 14}}
            placeholder={'登录邮箱'}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({userName: text})
            }}
            underlineColorAndroid='transparent'
            value={this.state.userName}
          />
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 10, backgroundColor: commonStyle.white, paddingVertical: 6, alignItems: commonStyle.center}}>
          <Icon name={`oneIcon|pwd_o`} size={20} color={commonStyle.themeColor}/>
          <TextInput
            style={{flex: 1, marginHorizontal: 10,  fontSize: 14}}
            placeholder={'密码'}
            secureTextEntry={this.state.secret}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({pwd: text})
            }}
            underlineColorAndroid='transparent'
            selectionColor={commonStyle.themeColor}
            value={this.state.pwd}
          />
        </View>
      </View>
    )
  }

  loginHandle() {

    this.setState({
      loading: !this.state.loading
    })
    let params = {}
    params.loadinId = this.state.userName
    params.password = this.state.pwd
    // params.loadinId = '234@com'
    // params.password = '123456'
    // params.iconurl = 'http://ovyjkveav.bkt.clouddn.com/17-11-9/48949929.jpg'
    // params.gender = '男'
    // params.province = '上海'
    // params.city = '静安'
    //let userLoginState= this.props.userLogin(params)

    // Promise.all([action.readingBannerList()]).then(response => {
    // })

    if(this.state.userName =="" || this.state.pwd == ""){
      Toast.showError("用户名/密码不能为空！");
      setTimeout(()=>{
        this.setState({
          loading: !this.state.loading
        })
      },300)
      return false;
    }
    Promise.resolve(action.login(params)).then(response => {
        if(!response.result.state){
          Toast.showError(response.result.message);
          setTimeout(()=>{
            this.setState({
              loading: !this.state.loading
            })
          },300)
          return false;
        }

        console.log(response.result, 9877123)
        //登录成功，存储用户数据
        storage.save('token', response.result.token);
        this.props.callback && this.props.callback('login')
        Toast.showSuccess('登录成功', () => Actions.pop())
        // storage.save('userInfo', params)
    })
  }

  renderLoginBtn() {
    const { loading } = this.state
    return (
      <View>
        {/* <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.loginClick()}
        >
          <Text style={{color: commonStyle.white, fontSize: 17}}>登录</Text>
        </TouchableOpacity> */}
        <Button
          title="登 录"
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          buttonStyle={{
            backgroundColor: commonStyle.themeColor,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 20
          }}
          loading={loading}
          disabled={loading}
          onPress= {()=>this.loginHandle()}
          containerStyle={{ marginTop: 20 }}
        />
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, marginTop: 15, marginHorizontal: 30, justifyContent: commonStyle.between}}>
          <TouchableOpacity onPress={() => Actions.userRegister()}>
            <Text style={{color: commonStyle.themeColor, fontSize: 14, fontWeight: 'bold'}}>免费注册</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: commonStyle.themeColor, fontSize: 14, fontWeight: 'bold'}}>找回密码</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInput()}
          {this.renderLoginBtn()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  activeClassName: {
    backgroundColor: commonStyle.themeColor,
  },
  active: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    width: deviceInfo.deviceWidth - 40,
    backgroundColor: commonStyle.themeColor,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderRadius: 25,
    borderWidth:0
  },
  loginBtn: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    width: deviceInfo.deviceWidth - 40,
    backgroundColor: commonStyle.themeColor,
    alignItems: commonStyle.center,
    justifyContent: commonStyle.center,
    borderRadius: 25,
    borderWidth:0
  }
})