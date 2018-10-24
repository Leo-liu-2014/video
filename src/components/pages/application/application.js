/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'

const musicList = [
  {
    "title": "分类1",
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
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
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
      dataSource: this.state.dataSource.cloneWithRows(musicList)
    })

    // this.props.getMusicList(this.props.year, this.props.month).then(response => {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(response.value.data)
    //   })
    // })
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity
        key={rowId}
        style={styles.cellStyle}
        onPress={() => Actions.movieCategoryList({id: 227422,title:rowData.title})}
      >
        <Image style={{width: 60, height: 60}} source={{uri: rowData.cover}}/>
        <View style={styles.contentStyle}>
          <Text style={{marginVertical: 5}}>{rowData.title}</Text>
          <Text style={{marginVertical: 5}}>分类介绍</Text>
        </View>
        <Image source={require('../../../assets/images/forward.png')} resizeMode={"center"}/>
      </TouchableOpacity>
    )
  }

  _render() {
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