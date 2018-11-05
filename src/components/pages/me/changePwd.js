/**
 * Created by guangqiang on 2017/11/14.
 */
import React from 'react'
import {View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, NativeModules, Platform, Alert} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {Icon, deviceInfo, Toast, commonStyle, storage} from '../../../utils'
import {Actions} from 'react-native-router-flux'
import {sharePlatform} from '../../../constants/commonType'

import { Button } from 'react-native-elements';


import action from '../../../actionCreators/me'


const LoginModule = NativeModules.loginModule


export default class Login extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      pwd: '',
      pwd1: '',
      secret: true,
      loading: false
    }
  }

  navigationBarProps() {
    return {
      title: '修改密码',
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
        <View style={{flexDirection: 'row', paddingHorizontal: 10, backgroundColor: commonStyle.white, paddingVertical: 6, alignItems: commonStyle.center}}>
          <Icon name={`oneIcon|pwd_o`} size={20} color={commonStyle.themeColor}/>
          <TextInput
            style={{flex: 1, marginHorizontal: 10,  fontSize: 14}}
            placeholder={'原密码'}
            secureTextEntry={this.state.secret}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({oldPwd: text})
            }}
            underlineColorAndroid='transparent'
            selectionColor={commonStyle.themeColor}
            value={this.state.oldPwd}
          />
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 10, backgroundColor: commonStyle.white, paddingVertical: 6, alignItems: commonStyle.center}}>
          <Icon name={`oneIcon|pwd_o`} size={20} color={commonStyle.themeColor}/>
          <TextInput
            style={{flex: 1, marginHorizontal: 10,  fontSize: 14}}
            placeholder={'新密码'}
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
        <View style={{flexDirection: 'row', paddingHorizontal: 10, backgroundColor: commonStyle.white, paddingVertical: 6, alignItems: commonStyle.center}}>
          <Icon name={`oneIcon|pwd_o`} size={20} color={commonStyle.themeColor}/>
          <TextInput
            style={{flex: 1, marginHorizontal: 10,  fontSize: 14}}
            placeholder={'确认密码'}
            secureTextEntry={this.state.secret}
            onChangeText={text => {
              text = text.replace(/ /g, '_')
              this.setState({pwd1: text})
            }}
            underlineColorAndroid='transparent'
            selectionColor={commonStyle.themeColor}
            value={this.state.pwd1}
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

        //登录成功，存储用户数据
        storage.save('userInfo', response.result);
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
          title="修改密码"
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