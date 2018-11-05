/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import action from '../../../actionCreators/category'

export default class CategoryList extends BaseComponent  {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  navigationBarProps() {
    return {
      title: this.props.title || "所有分类",
      hiddenLeftItem: true,
    }
  }

  componentDidMount() {
    console.log(this.props)
    let parentId = this.props.parentId ? this.props.parentId : 71;
    Promise.all([action.lableList({parentId:parentId})]).then(response => {
      this.timer = setTimeout(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response[0].result.data),
        })
      }, (10))
    })


  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity
        key={rowId}
        style={styles.cellStyle}
        onPress={() => Actions.movieCategoryList({categoryId: rowData.id,title:rowData.name})}
      >
        <Image style={{width: 60, height: 60}} source={{uri: rowData.cover?rowData.cover:'http://img.yidianling.com/file/2016/07/inu911sfu2qf1jwe.jpg!s330x330'}}/>
        <View style={styles.contentStyle}>
          <Text style={{marginVertical: 5,fontSize:14}}>{rowData.name}</Text>
          <Text style={{marginVertical: 5}}>{rowData.desc?rowData.desc:'暂无介绍'}</Text>
        </View>
        <Image source={require('../../../assets/images/forward.png')} resizeMode={"center"}/>
      </TouchableOpacity>
    )
  }

  _render() {

    // let dataSource = this.state.dataSource.cloneWithRows()
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
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