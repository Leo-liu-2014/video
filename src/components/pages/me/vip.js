/**
 * Created by guangqiang on 2017/11/16.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {commonStyle, Icon, deviceInfo, storage} from '../../../utils'
import {Actions} from 'react-native-router-flux'
import { PricingCard } from 'react-native-elements'
import Modal from "react-native-modal";
import action from '../../../actionCreators/me'


export default class Setting extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      visibleModal: null,
      wxImg:null
    }
  }

  navigationBarProps() {
    return {
      title: '升级VIP',
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

  getwximages() {
    Promise.resolve(action.getwximages())
    .then(response => {
      if(response){
          this.setState({
            wxImg: response.result.data.url || null,
            modalVisible: true
          })
        }
    })
  }

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={{color: commonStyle.white}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Hello!</Text>
      {this.renderButton("Close", () => this.setState({ modalVisible: false }))}
    </View>
  );
  _render() {
    console.log(this.state.wxImg, 'aaaaa')
    return (
      <View style={styles.container}>
        {this.state.modalVisible?(
        <Modal
          isVisible={true}
        >
          <View style={styles.modalContent}>
            <Text style={{marginBottom:10}}>请添加客服微信升级vip</Text>
            <Image
                style={styles.img}
                source={{uri:this.state.wxImg}}
              />
            {this.renderButton("确定", () => this.setState({ modalVisible: false }))}
          </View>
        </Modal>
        ):null}
        <ScrollView>
          {/* {this.renderSettingPanel()}
          {this.renderBtn()} */}
          <PricingCard
              style={{width:100}}
              color={commonStyle.themeColor}
              title='一个月'
              price='¥30'
              info={['30天全平台任意观看']}
              button={{ title: '立即升级VIP'}}
              onButtonPress={()=> this.getwximages('mouth')}
          />
          <PricingCard
              color={commonStyle.themeColor}
              title='三个月'
              price='¥88'
              info={['30天全平台任意观看','专属客服']}
              button={{ title: '立即升级VIP'}}
              onButtonPress={()=> this.getwximages('quarter')}
          />
          <PricingCard
              color={commonStyle.themeColor}
              title='一年'
              price='¥300'
              info={['30天全平台任意观看','专属客服','VPN加速']}
              button={{ title: '立即升级VIP'}}
              onButtonPress={()=> this.getwximages('year')}
          />
          <PricingCard
              color={commonStyle.themeColor}
              title='终身VIP'
              price='¥999'
              info={['30天全平台任意观看']}
              button={{ title: '立即升级VIP'}}
              onButtonPress={()=> this.getwximages('free')}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  button: {
    backgroundColor: commonStyle.themeColor,
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  scrollableModal: {
    height: 300
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: 100,
    height: 100,
  },
})