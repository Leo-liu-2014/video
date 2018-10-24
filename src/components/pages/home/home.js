/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Action from '../../../actions'
import {commonStyle} from '../../../utils/commonStyle'
import {SegmentedControl} from 'antd-mobile'
import ShowTimeList from './showTime/showTimeList'
import ComingNewList from './comeingNew/comeingNewList'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import deviceInfo from '../../../utils/deviceInfo'

import action from '../../../actionCreators/reading'


import Swiper from 'react-native-swiper'


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      hasMore: true,
      showTimeList: [],
      comeingNewList: [],
      attentionList: [],
      bannerList:[],
      showSwiper: true
    }
  }

  componentDidMount() {
  }

  onValueChange = (value) => {
    this.setState({selectedTab: value})
  }

  renderSwiper(){
    return(
      <Swiper style={styles.wrapper} height={150} autoplay loop>
          <TouchableOpacity  onPress={()=>{}} key={0}>
            <Image style={{height: 150}}
                  source={{uri: 'http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg'}}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{}}  key={1}>
            <Image style={{height: 150}}
                  source={{uri: 'http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg'}}/>
          </TouchableOpacity>
      </Swiper>
    )
  }

  tabArr = [
    {columnName: '推荐', type:"recommend", requestCode: 'T1348648517839'},
    {columnName: '闪酷', type:"others", requestCode: 'T1348649580692'},
    {columnName: '动物世界', type:"others", requestCode: 'T1348649654285'},
    {columnName: '装备清单', type:"others", requestCode: 'T1486979691117'},
    {columnName: 'Buff学员', type:"others", requestCode: 'T1421997195219'},
];

  render() {
    return (
      <ScrollableTabView
          ref={'tabView'}
          renderTabBar={() => <ScrollableTabBar style={{height:45,backgroundColor:"#fff"}} />}
          tabBarUnderlineStyle={{height:2, minWidth:Math.floor(deviceInfo.deviceWidth * .9 / 5),backgroundColor:'#fb7299'}}
          tabBarInactiveTextColor='#515151'
          tabBarActiveTextColor='#fb7299'
          tabBarTextStyle={{fontSize: 14}}
          onChangeTab={(obj) => {
            if(obj.i !=0){
              this.setState({
                showSwiper: false
              })
            }
          }}
          onScroll={(position) => {}}
          locked={false}
          initialPage={0}
      >
          {
            this.tabArr.map((item, index) => {
                return(
                      <View style={styles.containerStyle} key={index} tabLabel={item.columnName}>
                          <ScrollView style={{flex:1}}>
                            <View style={{flex:1}}>
                              { this.state.showSwiper?
                                  this.renderSwiper():null
                              }
                            </View>
                            <ShowTimeList title="Recommend" type={item.type} />
                          </ScrollView>
                        </View>
                )
            })
          }
      </ScrollableTabView>
      // <View style={styles.containerStyle}>
      //   <View style={styles.navBarStyle}>
      //     <View style={styles.segContainer}>
      //       <SegmentedControl
      //         style={styles.tabStyle}
      //         selectedIndex={0}
      //         values={['推荐', '分类1', '分类2']}
      //         onValueChange={(value)=> this.onValueChange(value)}
      //       />
      //     </View>
      //   </View>

      //   <ScrollView style={{flex:1}}>
      //     <View style={{flex:1}}>
      //       {this.renderSwiper()}
      //     </View>
      //     {
      //       this.state.selectedTab === '正在热映' ?
      //         <ShowTimeList title="Recommend" /> :
      //         null
      //     }
      //   </ScrollView>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: commonStyle.white,
  },
  navBarStyle: {
    height: commonStyle.navHeight,
    backgroundColor: commonStyle.themeColor,
  },
  segContainer: {
    marginTop: commonStyle.navStatusBarHeight,
    height: commonStyle.navContentHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabStyle: {
    width: 180
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const _MovieList = connect(
  (state) => state.movie.movieList,
  Action.dispatch('movie')
)(Home)

export default _MovieList