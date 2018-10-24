/**
 * Created by guangqiang on 2017/10/12.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Action from '../../../actions'
import {BaseComponent} from '../../base/baseComponent'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {Icon, storage} from '../../../utils'
import {ShareModal} from '../../../components/common/shareModal'

class Me extends BaseComponent {

  constructor(props) {
    super(props)
    this.scrollView = null
    this.state = {
      userInfo: undefined,
      shareModalVisible: false
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
    storage.load('userInfo', (response) => this.setState({userInfo: response}))
  }

  callback(type) {
    this.scrollView.scrollTo({x: 0, y: 0, animated: true})
    if (type === 'login' || type === 'register') {
      storage.load('userInfo', (response) => this.setState({userInfo: response}))
    } else {
      this.setState({userInfo: undefined})
    }
  }

  renderHeaderContainer() {
    let data = this.state.userInfo || {}
    return (
      <View style={{flexDirection: 'row', padding: 10, alignItems: commonStyle.center, backgroundColor: commonStyle.themeColor}}>
        <TouchableOpacity>
          {
            data.iconurl ? <Image style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#000'}} source={{uri: data.iconurl}}/> : <Icon name={'oneIcon|avatar_o'} size={60} color={'#f8f8f8'}/>
          }
        </TouchableOpacity>
        {
          this.state.userInfo ?
            <View style={{marginLeft: 10, justifyContent: commonStyle.center}}>
              <Text style={{marginBottom: 10, fontSize: 16, color: commonStyle.white}}>{data.name ? data.name : '用户名'}</Text>
              <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                <Text style={{color: commonStyle.white, marginRight: 10}}>{`${data.province}-${data.city}`}</Text>
                <TouchableOpacity style={styles.userInfo}>
                  <Text style={{color: commonStyle.white, marginLeft: 5, fontSize: 12}}>{data.gender}</Text>
                  <Icon name={`oneIcon|${data.gender === '男' ? 'man_o' : 'woman_o'}`} size={15} color={commonStyle.white}/>
                </TouchableOpacity>
              </View>
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

  renderActivityPanel() {
    return (
      <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, justifyContent: commonStyle.around, borderBottomWidth: 10, borderBottomColor: commonStyle.lineColor}}>
        {this.renderPanelItem('优惠券', 'coupon_o', '#F6A13C')}
        {this.renderPanelItem('口令红包', 'key_o', '#000000')}
        {this.renderPanelItem('礼品卡', 'gift_o', '#7A5CE5')}
        {this.renderPanelItem('时光比', 'magic_star_o', '#F8BD57')}
        {this.renderPanelItem('余额', 'rmb_s', '#F36B42')}
      </View>
    )
  }

  renderItem(title, icon, color, key) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => key ? Actions[key]({callback: () => this.callback()}) : null}
      >
        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
          <Text style={{marginRight: 5}}>{title}</Text>
          {
            icon ? <Icon name={`oneIcon|${icon}`} size={20} color={color}/> : null
          }
        </View>
        <Icon name={`oneIcon|push_arror_o`} size={20} color={'#B1B1B1'}/>
      </TouchableOpacity>
    )
  }

  renderList() {
    return (
      <View>
        {this.renderItem('升级VIP')}
        {this.renderItem('会员特权')}
        {this.renderItem('我的积分')}
        <View style={{borderTopWidth: 10, borderTopColor: commonStyle.lineColor}}>
          {this.renderItem('我的收藏')}
          {this.renderItem('我的推荐')}
          {this.renderItem('设置', '', '', 'setting')}
          {this.renderItem('Demo集合', '', '', 'demoPage')}
        </View>
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
          {/* {this.renderActivityPanel()} */}
          {this.renderList()}
        </ScrollView>
        {/* <ShareModal
          visible={this.state.shareModalVisible}
          onVisibleChange={(modalVisible) => this.setState({
            shareModalVisible: modalVisible
          })}/> */}
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