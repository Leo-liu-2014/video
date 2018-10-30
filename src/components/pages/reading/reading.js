/**
 * Created by guangqiang on 2017/9/4.
 */
import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {connect} from 'react-redux'
import Action from '../../../actions'
import ViewPager from 'react-native-viewpager'
import {commonStyle} from '../../../utils/commonStyle'
import ArticleList from './articleList'
import {Actions} from 'react-native-router-flux'

import Swiper from '../../common/swiper'
import action from '../../../actionCreators/category'

class Reading extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
  }

  componentDidMount() {
    Promise.resolve(action.getNovelList({id:8})).then(response => {
      if(response){
        this.setState({
          dataSource: response.result.date
        })
      }
    })
  }

  navigationBarProps() {
    return {
      title: '小说',
      hiddenLeftItem: true
    }
  }

  renderPage(data) {
    return (
      <TouchableOpacity
        style={styles.radingItem}
        onPress={() => 
          // Actions.webView({uri: 'http://www.jianshu.com/u/023338566ca5', title: '简书'})
          Actions.essayDetail({id: data.item.id, title: data.item.title})
        }
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{flex: 1, fontSize: 15, marginBottom: 5, color: commonStyle.textBlockColor}}>{data.item.title}</Text>
        </View>
        <Text style={{fontSize: 13, marginBottom: 5}}>{data.item.summary}</Text>
        <Text style={{fontSize: 13}}>{data.item.createtime}</Text>
      </TouchableOpacity>
    )
  }

  _render() {
    return (
      <View style={styles.container}>
        <ScrollView
          removeClippedSubviews={false}
        >
          <Swiper type="reading" />
          <View style={{flex:1,paddingLeft:10,paddingRight:10}}>
            {/* <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderPage}
            /> */}
            <FlatList
             data = {this.state.dataSource}
             renderItem={this.renderPage}
             keyExtractor = {(index, item) => {return "index"+index+item}}// 每个item的key
             onEndReached={()=>{
               // 到达底部，加载更多列表项
               // this.setState({
               //   listData: this.state.listData.concat(getData())
               // });
             }}
            />
          </View>
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
  cellStyle: {
    flexDirection: 'row',
    backgroundColor: commonStyle.green
  },
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  radingItem:{
    paddingBottom:5,
    borderBottomWidth:1,
    borderColor:"#f8f8f8",
    marginTop:5,
  }
})

const _Reading = connect(
  (state) => state.reading.reading,
  Action.dispatch('reading')
)(Reading)

export default _Reading