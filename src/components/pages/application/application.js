/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, ListView, Image, TouchableOpacity, SectionList, ScrollView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import deviceInfo from '../../../utils/deviceInfo'
import action from '../../../actionCreators/category'
import Swiper from '../../common/swiper'
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
    this._getRecommendListData()
  }
  _getRecommendListData = () => {
    Promise.resolve(action.appList()).then(response => {
      
      this.setState({
        dataSource: this.formatData(response.result.data)
      })
    })
  }

  formatData = (data=[]) => {
    let tempdata = [];
    data.map(item=>{
      if(item.appMangers !=""){
        tempdata.push({
          data: [item.appMangers],
          name: item.catalogName,
          id: item.catalogId,
        })
      }
    })
    return tempdata
  }

  _render() {
    const { dataSource } = this.state
    console.log(dataSource, 987)
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <Swiper type="app" />
          <View style={styles.content}>
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
          </View>
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
        <TouchableOpacity key={i} onPress={() => {}}>
            <View style={styles.row}>
                  <Image
                  style={styles.img}
                  source={{uri: item.imagesurl}}
                />
                <Text>{item.name}</Text>
            </View>
        </TouchableOpacity>
      )
  }


  _renderSectionHeader = ({ section }) => {
    return(
      <View style={styles.tabTitle}>
            <Text style={styles.textTitle} >{section.name}</Text>
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
  content: {
    flex: 1,
    backgroundColor: commonStyle.white,
    paddingLeft: 10, 
    paddingRight: 10,
    paddingTop:20,
  },
  list: {
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'flex-start',

  },
  row: {
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      width: (deviceInfo.deviceWidth - 1) / 4.2,
      height: (deviceInfo.deviceWidth - 1) / 3.8,
      alignItems: 'center',
      marginBottom:5
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
    width:(deviceInfo.deviceWidth - 1) / 5,
    height:(deviceInfo.deviceWidth - 1) / 5,
    marginBottom:5
  },
  tabTitle: {
    flexDirection:'row',  
    flexWrap:'wrap',  
    justifyContent:'space-between',
    height:35,
    marginTop:10

  },
  textTitle: {
    fontSize:16,
    color:"#000"
  },
  textMore: {
    color:"#999"
  },
  empty: {
    height:100,
    justifyContent: 'center', alignItems: 'center',
  }
});