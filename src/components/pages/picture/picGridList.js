/**
 * Created by guangqiang on 2017/9/5.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image, ListView} from 'react-native'
import deviceInfo from '../../../utils/deviceInfo'
import {monthList} from '../../../constants/commonType'
import {parseDate} from '../../../utils/dataUtil'
import {commonStyle} from '../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import {BaseComponent} from '../../base/baseComponent'
export default class AdLIst extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource:  new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
  }

  navigationBarProps() {
    return {
      title: '应用推荐'
    }
  }

  componentDidMount() {
    // this.props.getGridList(this.props.year, this.props.month).then(response => {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(response.value.data)
    //   })
    // })

    const data = [
      {
        hpcontent_id:'1',
        hp_img_url:'http://upstatic.qiecdn.com/upload/web_pic/201810/d59c261b7e4e840253db7e96e9cbbc79_thumb.jpeg',
        hp_title:'欢儿呀的直播间',
        hp_makettime:'123123123123123132'
      },
      {
        hpcontent_id:'2',
        hp_img_url:'http://upstatic.qiecdn.com/upload/web_pic/201810/d59c261b7e4e840253db7e96e9cbbc79_thumb.jpeg',
        hp_title:'欢儿呀的直播间',
        hp_makettime:'123123123123123132'
      }
    ]
    //设置静态数据
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  }

  renderRow(rowData, sectionID, rowID) {
    let date = parseDate(rowData.hp_makettime);
    let dateStr = `${date.getDate()} ${monthList[date.getMonth()]}.${date.getFullYear()}`
    return (
      <TouchableOpacity
        style={{backgroundColor: 'white', width: (deviceInfo.deviceWidth - 30) / 2, borderWidth: 1, borderColor: commonStyle.lineColor, marginRight: 8, marginBottom: 8}}
        onPress={() => Actions.picDetail({id: rowData.hpcontent_id, hiddenLeftItem: false})}
      >
        <Text>111</Text>
      </TouchableOpacity>
    )
  }

  _render() {
    return (
      <ListView
        style={styles.content}
        renderRow={this.renderRow}
        enableEmptySections
        dataSource={this.state.dataSource}
      />
    )
  }
}

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    backgroundColor: commonStyle.white,
    marginLeft: 12,
    marginTop: 5
  },
  listViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: commonStyle.white
  },
  picStyle: {
    height: 150
  }
})