/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity, FlatList} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import action from '../../../actionCreators/category'

export default class CategoryList extends BaseComponent  {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: []
    }
  }

  navigationBarProps() {
    return {
      title: '全部分类',
      hiddenLeftItem: true
    }
  }

  componentDidMount() {
    Promise.all([action.catatList()]).then(response => {
      this.timer = setTimeout(() => {
        this.setState({
          dataSource: response[0].result.data
        })
      }, (10))
    })
  }

  renderRow(rowData, sectionId, rowId) {
    const { item }  = rowData
    return (
      <TouchableOpacity
        key={rowId}
        style={styles.cellStyle}
        onPress={() => Actions.categoryListLabel({parentId: item.id,title:item.name})}
      >
        <Image style={{width: 60, height: 60}} source={{uri: item.cover?item.cover:'http://img.yidianling.com/file/2016/07/inu911sfu2qf1jwe.jpg!s330x330'}}/>
        <View style={styles.contentStyle}>
          <Text style={{marginVertical: 5,fontSize:14}}>{item.name}</Text>
          <Text style={{marginVertical: 5}}>{item.desc?item.desc:'暂无介绍'}</Text>
        </View>
      </TouchableOpacity>
    )
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

  _render() {
    const { dataSource } = this.state
    if(dataSource == ""){
      this._renderEmpty()
    }
    return (
      <FlatList
             data = {this.state.dataSource}
             renderItem={this.renderRow}
             keyExtractor = {this._extraUniqueKey}// 每个item的key
             onEndReached={()=>{
               // 到达底部，加载更多列表项
               // this.setState({
               //   listData: this.state.listData.concat(getData())
               // });
             }}
          />

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cellStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: commonStyle.lineColor,
    borderBottomWidth: commonStyle.lineWidth
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10
  }
})