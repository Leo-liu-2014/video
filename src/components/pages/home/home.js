/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {PureComponent} from 'react'
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux'

import action from '../../../actionCreators/category'
import Action from '../../../actions'
import {commonStyle} from '../../../utils/commonStyle'
import deviceInfo from '../../../utils/deviceInfo'
import Swiper from '../../common/swiper'

import ShowTimeList from './showTime/showTimeList'

class Home extends PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      refreshing: false,
      hasMore: true,
      showTimeList: [],
      comeingNewList: [],
      attentionList: [],
      bannerList: [],
      showSwiper: true,
      categoryList: [],
      init: false
    }
  }

  componentDidMount() {
    try{
      Promise.resolve(action.catatList())
      
        .then(response => {
          console.log(response, 333)
            this.timer = setTimeout(
              () => {
                  this.setState({
                    categoryList: response.result.data,
                    init: true
                  })
                },
              (10))
          })
    }catch(e){}
  }

  tabArr = [
    {name: '推荐', id: '1'},
    {name: '最新', id: '2'},
    {name: '排行', id: '3'},
    {name: '中文', id: '4'},
  ];

  render() {
    const {categoryList} = this.state;
    return (
      <View style={{
        flex: 1 }}>
        <ScrollableTabView
          ref = {'tabView'} 
          renderTabBar = { () => < ScrollableTabBar style = {{ height: 45, backgroundColor: '#fff' }} />}
          tabBarUnderlineStyle={{ height: 2, backgroundColor: '#fb7299' }}
          tabBarInactiveTextColor='#515151'
          tabBarActiveTextColor='#fb7299'
          tabBarTextStyle={{ fontSize: 14 }}
          onChangeTab={(obj) => {
          }}
          onScroll={(position) => { }}
          locked={false}
          initialPage={0}
          page={0}
        >
          {this.tabArr.map((item, index) => {
              return (
                <View style={styles.containerStyle} key={index} tabLabel={item.name}>
                  <ScrollView style={{ flex: 1 }}>
                    {item.id == 1 ? <Swiper type="home" />:null}
                    <ShowTimeList title = {item.name} id = {item.id} />
                  </ScrollView>
                </View>
              )
            })}
        </ScrollableTabView>
        </View>
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