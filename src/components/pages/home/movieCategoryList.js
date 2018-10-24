/**
 * Created by guangqiang on 2017/10/10.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, ListView, StyleSheet} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import {Icon} from '../../../utils/icon'
import {Actions} from 'react-native-router-flux'
import ShowTimeCell from './showTime/showTimeCell'
import action from '../../../actionCreators/category'

const homeData= [
  {
    img: "http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg",
    title:"杨幂演绎“弃儿拯救弃儿”的故事",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/26/mp4/180626214809040834.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/11/174027.67550491_1280X720X2.jpg",
    title:"特工姐妹花联手拯救世界",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/09/30/mp4/180930144659834544.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/25/113254.40208555_1280X720X2.jpg",
    title:"周润发郭富城联手“钞级大骗",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/10/mp4/180610140307731499.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg",
    title:"大块头也有小可爱",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/08/31/mp4/180831211612882574.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg",
    title:"杨幂演绎“弃儿拯救弃儿”的故事",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/26/mp4/180626214809040834.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/11/174027.67550491_1280X720X2.jpg",
    title:"特工姐妹花联手拯救世界",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/09/30/mp4/180930144659834544.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/25/113254.40208555_1280X720X2.jpg",
    title:"周润发郭富城联手“钞级大骗",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/10/mp4/180610140307731499.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg",
    title:"大块头也有小可爱",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/08/31/mp4/180831211612882574.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg",
    title:"杨幂演绎“弃儿拯救弃儿”的故事",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/26/mp4/180626214809040834.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/11/174027.67550491_1280X720X2.jpg",
    title:"特工姐妹花联手拯救世界",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/09/30/mp4/180930144659834544.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/25/113254.40208555_1280X720X2.jpg",
    title:"周润发郭富城联手“钞级大骗",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/10/mp4/180610140307731499.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg",
    title:"大块头也有小可爱",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/08/31/mp4/180831211612882574.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg",
    title:"杨幂演绎“弃儿拯救弃儿”的故事",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/26/mp4/180626214809040834.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/11/174027.67550491_1280X720X2.jpg",
    title:"特工姐妹花联手拯救世界",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/09/30/mp4/180930144659834544.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/25/113254.40208555_1280X720X2.jpg",
    title:"周润发郭富城联手“钞级大骗",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/10/mp4/180610140307731499.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg",
    title:"大块头也有小可爱",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/08/31/mp4/180831211612882574.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg",
    title:"杨幂演绎“弃儿拯救弃儿”的故事",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/26/mp4/180626214809040834.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/11/174027.67550491_1280X720X2.jpg",
    title:"特工姐妹花联手拯救世界",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/09/30/mp4/180930144659834544.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/25/113254.40208555_1280X720X2.jpg",
    title:"周润发郭富城联手“钞级大骗",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/10/mp4/180610140307731499.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg",
    title:"大块头也有小可爱",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/08/31/mp4/180831211612882574.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/13/183225.18667083_1280X720X2.jpg",
    title:"杨幂演绎“弃儿拯救弃儿”的故事",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/26/mp4/180626214809040834.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/11/174027.67550491_1280X720X2.jpg",
    title:"特工姐妹花联手拯救世界",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/09/30/mp4/180930144659834544.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/25/113254.40208555_1280X720X2.jpg",
    title:"周润发郭富城联手“钞级大骗",
    type:'free',
    type_tips:'限时免费',
    volume:1234,
    id:244048,
    url:'https://vfx.mtime.cn/Video/2018/06/10/mp4/180610140307731499.mp4'
  },
  {
    img: "http://img5.mtime.cn/mt/2018/09/30/153647.85396352_1280X720X2.jpg",
    title:"大块头也有小可爱",
    type:'free',
    type_tips:'VIP专享',
    volume:1234,
    id:227422,
    url:'https://vfx.mtime.cn/Video/2018/08/31/mp4/180831211612882574.mp4'
  },
]


export default class TrailerList extends BaseComponent {

  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  navigationBarProps() {
    return {
      title: this.props.title,
      titleStyle: {
        color: commonStyle.black
      },
      leftIcon: {
        name: 'nav_back_o',
        size: 20,
        color: commonStyle.black
      }
    }
  }

  componentDidMount() {
    Promise.all([action.contentList({categoryId:this.props.categoryId,limt:10,pageNum:1})]).then(response => {
      console.log(response[0].result.data,88888)
      this.timer = setTimeout(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([response[0].result.data]),
        })
      }, (10))
    })
    //this.props.getTrailerList({pageIndex: 1, movieId: this.props.id})
  }

  renderRow(rowData, sectionId, rowId) {

    
    return (
      // <TouchableOpacity style={styles.cellStyle} onPress={() => Actions.moviePlayer({url: rowData.url, title: rowData.title})}>
      //   <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}>
      //     <Image style={styles.img} source={{uri: rowData.image}}/>
      //     <View style={{position: commonStyle.absolute}}>
      //       <Icon name={'oneIcon|play_cycle_o'} size={25} color={commonStyle.white}/>
      //     </View>
      //   </View>
      //   <View style={{paddingHorizontal: 10, flex: 1, height: 60, justifyContent: commonStyle.around}}>
      //     <Text style={{fontSize: 15, color: commonStyle.textBlockColor, fontWeight: 'bold'}}>{rowData.title}</Text>
      //     <Text style={{color: commonStyle.textGrayColor}}>{`片长：${rowData.length}`}</Text>
      //   </View>
      // </TouchableOpacity>
      <View style={styles.gridContainer}>
      {
        rowData.map((item, index) => {
          return (
            // <TouchableOpacity key={index} style={styles.gridItem}>
            //   <Text style={styles.gridTitle}>123123</Text>
            // </TouchableOpacity>
            <ShowTimeCell key={index} index={index} rowData={item} />
          )
        })
      }
    </View>

    )
  }

  _render() {
    let dataArr = this.props.trailerList || []

    //let dataSource = this.state.dataSource.cloneWithRows([this.state.dataSource])
    return (
      <View style={styles.content}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: commonStyle.white,
    paddingLeft: 10, 
    paddingRight: 10,
    paddingTop:20,
  },
  container: {
    flex: 1,
    backgroundColor: commonStyle.white
  },
  cellStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: commonStyle.lineColor
  },
  img: {
    width: 100,
    height: 60
  },
  gridContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
})