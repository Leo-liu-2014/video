import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import ViewPager from 'react-native-viewpager'
import {BaseComponent} from '../../../components/base/baseComponent'
import {connect} from 'react-redux'
import MusicDetail from './musicDetail'
import Action from '../../../actions'
// import action from '../../../actionCreators/music'
import {articleType, beginTime} from '../../../constants/commonType'

const musicList = [
  {
    "title": "第一首",
    "cover": "http://img.yidianling.com/file/2016/07/inu911sfu2qf1jwe.jpg!s330x330",
    "url": "http://img.yidianling.com/file/2016/07/77xdvc0du8vieg4z.mp3"
  },
  {
    "title": "第二首",
    "cover": "http://img.yidianling.com/file/2016/07/kqy3nolw2e7xoupi.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/07/02/f0662d2e4e9bc9813872ae5d11e8a37d.mp3"
  },
  {
    "title": "第三首",
    "cover": "http://img.yidianling.com/file/2016/07/y7g53dx25685z6it.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/07/01/a79a4daee77dd8c2136559567426c3ad.mp3"
  },
  {
    "title": "第四首",
    "cover": "http://img.yidianling.com/file/2016/06/jcb1lg33dfz9k11u.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/30/0e758ed7d37666d27abe0d94fdc03a0d.mp3"
  },
  {
    "title": "第五首",
    "cover": "http://img.yidianling.com/file/2016/06/bwj19xtgraa8hdk7.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/29/453d9597a7c907c34ccc7b3c74f0f9e7.mp3"
  },
  {
    "title": "第六首",
    "cover": "http://img.yidianling.com/file/2016/06/mlmvla07jw7hgr42.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/27/2cf652d89b8765dbaaeede548d16fde5.mp3"
  },
  {
    "title": "第七首",
    "cover": "http://img.yidianling.com/file/2016/06/04u9vnuug0itovd8.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/25/1d2d50587034b6665d153d4b4995043f.mp3"
  },
  {
    "title": "第八首",
    "cover": "http://img.yidianling.com/file/2016/06/rwx320illlojg7dd.jpg!s330x330",
    "url": "http://video.yidianling.com/2016/06/25/80f9c394daec2dd553d1c7042ed4ac56.mp3"
  }
]

class Category extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
    this.state = {
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2}),
      pageNum: 0
    }
  }

  navigationBarProps() {
    return {
      title: '全部分类',
      hiddenLeftItem: true
    }
  }

  componentDidMount() {

    this.setState({
      dataSource: this.state.dataSource.cloneWithPages(musicList),
      pageNum: musicList.length -1
    })

    // action.musicIdList().then(response => {
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithPages(response.data),
    //     pageNum: response.data.length -1
    //   })
    // })
  }

  renderPage(rowData, rowId) {
    return (
      // <MusicDetail {...this.props} key={rowId} id={parseInt(rowData)}/>
      <Text>1</Text>
    )
  }

  onChangePage(index) {
    index === this.state.pageNum ? Actions.pastList({beginTime: beginTime.music, pageType: articleType.MUSIC}) : null
  }

  _render() {
    return (
      // <ViewPager
      //   style={styles.container}
      //   onChangePage={this.onChangePage}
      //   renderPage={this.renderPage}
      //   dataSource={this.state.dataSource}
      //   renderPageIndicator={false}
      // />
      <View>
        <Text>222</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const _Category = connect(
  (state) => state.music.music,
  Action.dispatch('music')
)(Category)

export default _Category