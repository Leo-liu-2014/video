/**
 * Created by guangqiang on 2017/10/12.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert} from 'react-native'
import {connect} from 'react-redux'
import Action from '../../../actions'
import {BaseComponent} from '../../base/baseComponent'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {Icon, storage} from '../../../utils'
import {ShareModal} from '../../../components/common/shareModal'
import { Button } from 'react-native-elements';
import deviceInfo from '../../../utils/deviceInfo'
import action from '../../../actionCreators/me'

class Me extends BaseComponent {

  constructor(props) {
    super(props)
    this.scrollView = null
    this.state = {
      userInfo: null,
    }
  }

  navigationBarProps() {
    return {
      title: '我的',
      titleStyle: {
        color: commonStyle.white
      },
      hiddenLeftItem: true,
      navBarStyle: {
        backgroundColor: commonStyle.themeColor,
        borderBottomWidth: 0
      }
    }
  }

  onRightPress() {
    this.setState({shareModalVisible: true})
  }

  componentDidMount() {
    this.getUserInfo()
  }
  componentWillReceiveProps(){
    this.getUserInfo()
  }

  getUserInfo() {
    Promise.resolve(action.getuserInfo())
    .then(response => {
      console.log(response)
      if(response){
          this.setState({
            userInfo: response.result.usertitle
          })
        }
    })
  }

  callback(type) {
    this.scrollView.scrollTo({x: 0, y: 0, animated: true})
    if (type === 'login' || type === 'register') {
      storage.load('userInfo', (response) => this.setState({userInfo: response}))
    } else {
      this.setState({userInfo: undefined})
    }
  }

  logoutHandle() {

    Alert.alert(
      '退出登录',
      `确定要退出登录吗？`,
      [
        {text: '确定', onPress: () => {
            storage.remove('token')
            Actions.userLogin();
            // Linking.openURL('https:www.baidu.com');
          },
        },
        {text: '取消', onPress: () => {
            console.log('取消')
          },
        },
      ]
    )

    
  }

  renderHeaderContainer() {
    const { userInfo } = this.state

    return (
      <View style={{flexDirection: 'row', padding: 10, alignItems: commonStyle.center, backgroundColor: commonStyle.themeColor}}>
        {/* <TouchableOpacity>
          {
            userInfo.iconurl ? <Image style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#000'}} source={{uri: userInfo.iconurl}}/> : <Icon name={'oneIcon|avatar_o'} size={60} color={'#f8f8f8'}/>
          }
        </TouchableOpacity> */}
        {
          userInfo ?
            <View style={{marginLeft: 10, justifyContent: commonStyle.center, alignItems:'center', width: deviceInfo.deviceWidth}}>
              <Text style={{marginBottom: 10, fontSize: 16, color: commonStyle.white}}>邮箱：{userInfo.email}</Text>
              <Text style={{marginBottom: 10, fontSize: 16, color: commonStyle.white}}>昵称：{userInfo.name}</Text>
              {userInfo.endtime?(<Text style={{marginBottom: 10, fontSize: 14, color: commonStyle.white}}>会员到期时间：{userInfo.endtime}</Text>):null}
              
              {/* <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                  <Text style={{color: commonStyle.white, marginRight: 10}}>{userInfo.type!=0?"注册会员":"vip会员"}</Text>
              </View> */}
            </View> :
            <View style={{flexDirection: 'row', alignItems: commonStyle.center}}>
              <TouchableOpacity style={[styles.loginBtn, {backgroundColor:commonStyle.white}]} onPress={() => Actions.userLogin({callback: (type) => this.callback(type)})}>
                <Text style={{color: commonStyle.themeColor}}>登录</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.loginBtn, {backgroundColor:commonStyle.themeColor2}]} onPress={() => Actions.userRegister({callback: (type) => this.callback(type)})}>
                <Text style={{color: commonStyle.white}}>注册</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    )
  }

  renderDataItem(title, count) {
    return (
      <TouchableOpacity style={{justifyContent: commonStyle.center, alignItems: commonStyle.center, padding: 20}}>
        <Text>{count}</Text>
        <Text style={{marginTop: 5}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  renderPanelItem(title, icon, color) {
    return (
      <TouchableOpacity
        style={{justifyContent: commonStyle.center, alignItems: commonStyle.center, padding: 20}}
      >
        <Icon name={`oneIcon|${icon}`} size={30} color={color}/>
        <Text style={{marginTop: 5, color: commonStyle.textBlockColor}}>{title}</Text>
      </TouchableOpacity>
    )
  }

  renderItem(title, icon, color, key) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => key ? Actions[key]({callback: () => this.callback()}) : null}
      >
        <View style={{flexDirection: commonStyle.row, height:30, alignItems: commonStyle.center}}>
          {
            icon ? <Icon name={`oneIcon|${icon}`} size={20} color={color}/> : null
          }
          <Text style={{marginRight: 5,marginLeft:10}}>{title}</Text>
        </View>
        <Icon name={`oneIcon|push_arror_o`} size={20} color={'#B1B1B1'}/>
      </TouchableOpacity>
    )
  }

  renderList() {
    return (
      <View>
        
        {/* {this.renderItem('会员特权')} */}
        {/* {this.renderItem('我的积分')} */}
        <View style={{borderTopWidth: 10, borderTopColor: commonStyle.lineColor}}>
          {this.renderItem('升级VIP','rmb_s',commonStyle.themeColor,'vip')}
          {this.renderItem('我的收藏','gift_o',commonStyle.themeColor,'collection')}
          {this.renderItem('修改密码','pwd_o',commonStyle.themeColor,'changePwd')}
          
          {/* {this.renderItem('我的推荐')} */}
          {/* {this.renderItem('设置', '', '', 'setting')} */}
          {/* {this.renderItem('Demo集合', '', '', 'demoPage')} */}
        </View>
      </View>
    )
  }

  renderButton() {
    return(
      <View style={{flex:1,marginTop:20}}>
        <Button
          title="退 出"
          buttonStyle={{
            backgroundColor: commonStyle.themeColor,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10
          }}
          onPress= {()=>this.logoutHandle()}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(sc) => this.scrollView = sc}
          style={styles.scStyle}
          bounces={false}>
          {this.renderHeaderContainer()}
          {this.renderList()}
          {this.state.userInfo?this.renderButton():null}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white,
  },
  loginBtn: {
    borderRadius: 5,
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginLeft: 20,
  },
  item: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    padding: 10,
    borderBottomWidth: commonStyle.lineWidth,
    borderBottomColor: commonStyle.lineColor,
    justifyContent: commonStyle.between
  },
  userInfo: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    backgroundColor: '#F36B42',
    paddingHorizontal: 5,
    borderRadius: 10,
    justifyContent: commonStyle.around
  }
})

const _Me = connect(
  state => state.me.me,
  Action.dispatch(['me', 'openChat'])
)(Me)

export default _Me