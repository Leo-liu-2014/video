/**
 * Created by godliu on 2017/9/4.
 */
import React, {PureComponent, Component} from 'react'
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Input} from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {connect} from 'react-redux'

import action from '../../../actionCreators/category'
import Action from '../../../actions'
import {Actions} from 'react-native-router-flux'
import {commonStyle} from '../../../utils/commonStyle'
import deviceInfo from '../../../utils/deviceInfo'
import ShowTimeList from './showTime/showTimeList'
import {Icon, storage} from '../../../utils'
import { SearchBar } from 'react-native-elements';
import { RootHUD } from '../../../utils/progressHUD'

class Home extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      categoryList: [],
    }
  }

  componentDidMount() {
    storage.load('token', (response) => {
      if(response){
        try{
          Promise.resolve(action.lableList({parentId:'131'}))
            .then(response => {
              if(response){
                  this.setState({
                    categoryList: response.result.data
                  })
                }
              })
        }catch(e){}
      }
    })
  }

  render() {
    const { categoryList } = this.state;
    return (
      <View style={{flex: 1 }}>
        {
            <ScrollableTabView
              ref = {'tabView'} 
              renderTabBar = { () => < ScrollableTabBar style = {{ height: 45, backgroundColor: '#fff',borderBottomWidth:0 }} />}
              tabBarUnderlineStyle={{ height: 0, backgroundColor: '#fb7299' }}
              tabBarInactiveTextColor='#515151'
              tabBarActiveTextColor='#fb7299'
              tabBarTextStyle={{ fontSize: 16 }}
              onScroll={(position) => {}}
              locked={false}
              initialPage={0}
              page={0}
            >
              {categoryList.map((item, index) => {
                  return (
                    <View style={styles.containerStyle} key={index} tabLabel={item.name}>
                      <ShowTimeList title= {item.name} id={item.id} />
                    </View>
                  )
                })
              }
              {/* <View><Text>无数据</Text></View> */}
            </ScrollableTabView>
        }
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