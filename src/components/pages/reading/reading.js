/**
 * Created by guangqiang on 2017/9/4.
 */
import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ListView} from 'react-native'
import {BaseComponent} from '../../base/baseComponent'
import {connect} from 'react-redux'
import Action from '../../../actions'
import ViewPager from 'react-native-viewpager'
import {commonStyle} from '../../../utils/commonStyle'
import ArticleList from './articleList'
import {Actions} from 'react-native-router-flux'

import Swiper from '../../common/swiper'
import action from '../../../actionCreators/category'

const reading = [
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },{
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
  {
    title:"最后的审判22",
    excerpt:"世界上有很多错事丑事脏事，但爱，永远不是错。",
    maketime:"2018-10-16 06:00:00"
  },
]

class Reading extends BaseComponent {
  constructor(props) {
    super(props)
    this.renderPage = this.renderPage.bind(this)
    this.imgClick = this.imgClick.bind(this)
    this.timer = null
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      bannerList: [],
      swiperShow: false,
      imageIndex: 0,
      articleLength: 0
    }
  }

  componentDidMount() {
    
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(reading),
    // })

    Promise.resolve(action.getNovelList({id:8})).then(response => {
      if(response){
        this.timer = setTimeout(() => {
          this.setState({
              dataSource: this.state.dataSource.cloneWithRows(response.result.data)
          })
        }, (10))
      }
    }).catch(()=>{
      console.log(111)
    })

    // Promise.all([action.readingBannerList(), action.readingArticleList()]).then(response => {

    //   console.log(response, 333)
    //   this.timer = setTimeout(() => {
    //     this.setState({
    //       bannerList: response[0].data,
    //       swiperShow: true,
    //       articleLength:response[1].data.length
    //     })
    //   }, (10))
    // })
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  navigationBarProps() {
    return {
      title: '小说',
      hiddenLeftItem: true
    }
  }

  pushDetail(data) {
    // let data = this.props.rowData
    // if (data.content_id) {
    //   Actions.essayDetail({id: data.content_id})
    // } else if (data.serial_id) {
    //   Actions.serialDetail({id: data.id})
    // } else if (data.question_id) {
    //   Actions.questionDetail({id: data.question_id})
    // }
    console.log(data, 123123)
    Actions.essayDetail({id: 128})
  }

  renderPage(data, sectionId, rowId) {
    return (
      <TouchableOpacity
        style={styles.radingItem}
        onPress={() => this.pushDetail(data)}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{flex: 1, fontSize: 15, marginBottom: 5, color: commonStyle.textBlockColor}}>{data.title}</Text>
        </View>
        <Text style={{fontSize: 13, marginBottom: 5}}>{data.excerpt}</Text>
        <Text style={{fontSize: 13}}>{data.maketime}</Text>
      </TouchableOpacity>
    )
  }

  imgClick(i, e) {
    let data  = this.state.bannerList[i]
    Actions.bannerDetail({data: data})
  }

  renderImg() {
    tempArr = []
    let picArr = this.state.bannerList || []
    for (var i = 0; i < picArr.length; i++) {
      tempArr.push(
        <TouchableOpacity ref={i} key={i} onPress={this.imgClick.bind(this, i)}>
          <Image style={{height: 150}}
                 source={{uri: picArr[i].cover}}/>
        </TouchableOpacity>
      )
    }
    return tempArr
  }

  _onChangePage(index) {
    if (index === this.state.articleLength -1) {
      Actions.readingTab()
    }
  }

  _render() {
    console.log(this.state, 'this.state')
    return (
      <View style={styles.container}>
        <ScrollView
          removeClippedSubviews={false}
        >
          <Swiper type="app" />
          
          <View style={{flex:1,paddingLeft:10,paddingRight:10}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderPage}
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