/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity, SectionList, ScrollView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import deviceInfo from '../../../utils/deviceInfo'

const appList = [
  {
    "title": "应用1",
    "cover": "http://img.yidianling.com/file/2016/07/inu911sfu2qf1jwe.jpg!s330x330",
    "url": "http://img.yidianling.com/file/2016/07/77xdvc0du8vieg4z.mp3"
  },
  {
    "title": "分类2",
    "cover": "http://img.yidianling.com/file/2016/07/kqy3nolw2e7xoupi.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/07/02/f0662d2e4e9bc9813872ae5d11e8a37d.mp3"
  },
  {
    "title": "分类3",
    "cover": "http://img.yidianling.com/file/2016/07/y7g53dx25685z6it.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/07/01/a79a4daee77dd8c2136559567426c3ad.mp3"
  },
  {
    "title": "分类4",
    "cover": "http://img.yidianling.com/file/2016/06/jcb1lg33dfz9k11u.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/30/0e758ed7d37666d27abe0d94fdc03a0d.mp3"
  },
  {
    "title": "分类5",
    "cover": "http://img.yidianling.com/file/2016/06/bwj19xtgraa8hdk7.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/29/453d9597a7c907c34ccc7b3c74f0f9e7.mp3"
  },
  {
    "title": "分类6",
    "cover": "http://img.yidianling.com/file/2016/06/mlmvla07jw7hgr42.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/27/2cf652d89b8765dbaaeede548d16fde5.mp3"
  },
  {
    "title": "分类7",
    "cover": "http://img.yidianling.com/file/2016/06/04u9vnuug0itovd8.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/25/1d2d50587034b6665d153d4b4995043f.mp3"
  },
  {
    "title": "分类8",
    "cover": "http://img.yidianling.com/file/2016/06/rwx320illlojg7dd.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/25/80f9c394daec2dd553d1c7042ed4ac56.mp3"
  }
]

export default class CategoryList extends BaseComponent  {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }

  navigationBarProps() {
    return {
      title: '应用推荐',
      hiddenLeftItem: true
    }
  }

  componentDidMount() {
    this.setState({
      dataSource: [ 
        {data: [appList], title: "热门推荐"},
        {data: [appList], title: "最近更新",},
      ]
    })
  }
  _render() {
    const { dataSource } = this.state
    return (
      <View style={{flex:1}}>
        <ScrollView>
          {/* <Swiper /> */}
          <SectionList
              contentInset={{top:0,left:0,bottom:49,right:0}}// 设置他的滑动范围
              renderItem={this._renderItem}
              // ListFooterComponent={this._listFooterComponent}
              // ListHeaderComponent={this._listHeaderComponent}
              renderSectionHeader={this._renderSectionHeader}
              showsVerticalScrollIndicator={false}
              keyExtractor = {this._extraUniqueKey}// 每个item的key
              // contentContainerStyle={styles.list}
              // horizontal={true}
              // pageSize={4}  // 配置pageSize确认网格数量
              initialNumToRender={2}
              sections={ dataSource }
          />
        </ScrollView>
      </View>
    )
  }

  _renderItem = ({ item})=> {
    return (
        <View  style={styles.list}>
            {
              item.map((item, i) => this.renderExpenseItem(item, i))
            }
        </View>

    )
  };

  renderExpenseItem(item, i) {
      return (
        <TouchableOpacity key={i} onPress={() => this._pressRow(item)} underlayColor="transparent">
            <View style={styles.row}>
                <Image
                  style={styles.img}
                  source={{uri: item.cover}}
                />
                <Text>{item.title}</Text>
            </View>
        </TouchableOpacity>
      )
  }


  _renderSectionHeader = ({ section }) => {
    return(
      
      <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText} >{section.title}</Text>
        </View>
    )
  }

  _listHeaderComponent() {
      return (
          <Text>Header</Text>
      );
  }

  _listFooterComponent() {
      return (
          <Text style={[styles.remark]}>footer</Text>
      );
  }

  _pressRow(item) {
      this.props.navigator.pushTo(item.go)
  } 

  _extraUniqueKey(item ,index){
      return "index"+index+item;
  }

  _renderEmpty() {
    return(
      <View>
        <Text>努力加载中！</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  list: {
      //justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      backgroundColor: '#FFFFFF'
  },
  row: {
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      width: (deviceInfo.deviceWidth - 1) / 4,
      height: (deviceInfo.deviceWidth - 1) / 3,
      alignItems: 'center',
      // borderWidth: 0.5,
      // borderRadius: 5,
      // borderColor: '#E6E6E6'
  },
  sectionHeader: {
      padding: 6.5,
      
  },
  sectionHeaderText: {
    fontSize: 14,
    color: '#000',
  },
  remark: {
      margin: 10,
      fontSize: 10,
      color: '#D2D2D2',
      marginBottom: 10,
      alignSelf: 'center',
  },
  img : {
    width:(deviceInfo.deviceWidth - 1) / 4.5,
    height:(deviceInfo.deviceWidth - 1) / 4,
    marginBottom:5
  }
});