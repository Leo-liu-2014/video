import React, {Component} from 'react'
import {View, ListView, Image, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import ShowTimeCell from './showTimeCell'

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
]

const homeData1= [
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

const homeData2= [
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

export default class ShowTimeList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    }
  }
  
  renderListView(dataSource){
    if(this.props.type==='recommend'){
      return(
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderSectionHeader}
        />
      )
    }

    return(
      <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          enableEmptySections
      />
    )
  }

  render() {
    let dataSource = this.state.dataSource.cloneWithRowsAndSections([[homeData],[homeData1],[homeData2]])
    return (
      <View style={styles.content}>
        {this.renderListView(dataSource)}
      </View>
    )
  }
  
  _renderRow = (item, sectionId) => {
    let sectionIndex = Number(sectionId);
    if(item.length ===0){
      return(
        <View style={styles.gridContainer}>
          <Text>opps! nodata</Text>
        </View>
      )
    }
    return (
      <View style={styles.gridContainer}>
          {
            item.map((item, index) => {
              if(index > 5){
                return(
                  <View key={index} />
                )
              }
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
  };
  
  _renderSectionHeader = (sectionData, sectionId) => {
    let sectionIndex = Number(sectionId);
    let category = '';
    switch (sectionIndex) {
      case 0:
        category = '今日热门';
        break;
      case 1:
        category = '最近更新';
        break;
      case 2:
        category = '今日推荐';
        break;
    }
    return (
      <View style={styles.tabTitle}>
        <Text style={styles.textTitle}>{category}</Text>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={(data) => {
            Actions.movieCategoryList({id: 227422,title:category})
          }}
          key={this.props.index}
        >
          <Text style={styles.textMore}>更多></Text>
        </TouchableOpacity>
      </View>
    )
  };
}

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: commonStyle.white,
    paddingLeft: 10, 
    paddingRight: 10,
    paddingTop:20,
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  cellContainer: {
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    flexDirection:'row',
    alignItems:'center',
    padding:15
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    marginLeft: 15,
  },
  tabTitle: {
    flexDirection:'row',  
    flexWrap:'wrap',  
    justifyContent:'space-between',
    height:35,
    marginTop:10

  },
  textTitle: {
    fontSize:20,
    color:"#000"
  },
  textMore: {
    color:"#999"
  },

  gridContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
});