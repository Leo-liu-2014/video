/**
 * Created by guangqiang on 2017/9/4.
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Action from '../../../actions'
import ViewPager from 'react-native-viewpager'
import PicDetail from './picDetail'
import {Actions} from 'react-native-router-flux'
import PicGridList from './picGridList'

const adList=[
  {
    id:1,
    imageUrl:'http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg',
    title: '老虎机'
  },
  {
    id:2,
    imageUrl:'http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg',
    title: '老虎机1'
  },
  {
    id:3,
    imageUrl:'http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg',
    title: '老虎机2'
  },
  {
    id:4,
    imageUrl:'http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg',
    title: '老虎机3'
  },
  {
    id:5,
    imageUrl:'http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg',
    title: '老虎机4'
  },
  
]
class AdList extends Component {

  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.state = {
      dataCount: 0,
      dataSource: new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2})
    }
  }

  componentDidMount() {

    this.setState({
      dataSource: this.state.dataSource.cloneWithPages(adList),
      dataCount: length
    })

    // action.picList().then(response => {
    //   let dataArr = response.data
    //   let length = dataArr.length
    //   let newArr = dataArr.concat(dataArr[length-1])
    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithPages(newArr),
    //     dataCount: length
    //   })
    // })
  }

  _onChangePage(index) {
    if (index === this.state.dataCount) {
      Actions.pastList({beginTime: beginTime.picture, pageType: articleType.PICTURE})
    }
  }

  renderPage(data, pageID) {
    return (
      // <PicGridList {...this.props} id={parseInt(data)} />
      <Text></Text>
      
    )
  }

  render() {
    let dataArr = this.state.dataSource
    return (
      <View>
        <Text>123123</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})

const _AdList = connect(
  (state) => state.picture.picList,
  Action.dispatch('picture')
)(AdList)

export default _AdList