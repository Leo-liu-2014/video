import React, {Component} from 'react'
import {View, ListView, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, SectionList, RefreshControl, Input} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import ShowTimeCell from './showTimeCell'
import deviceInfo from '../../../../utils/deviceInfo'

import action from '../../../../actionCreators/category'
import Swiper from '../../../common/swiper'
import {Icon} from '../../../../utils/icon'


export default class ShowTimeList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: false
    }
  }

  componentDidMount(){
      //初始化数据
      this.getAllData()
  }
  getAllData = () =>{
    const { id, title } = this.props;

    if(id == 132){
      this._getListData(id)
      // this.setState({
      //   dataSource: this._getRecommendListData(id)
      // })
    }else{
      this._getListData(id)
      // this.setState({
      //   dataSource: this._getListData(id)
      // })
    }
  }
  renderListView(dataSource){
    const { id, title } = this.props;
    if(id == 1){
      return(
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
              refreshing={false}
              // initialNumToRender={2}
              sections={ dataSource }
              onRefresh={()=>{
                console.log('开始刷新');
              }}
          />
       )
    }else{
      return(
        <FlatList
             data = {dataSource}
             renderItem={this._renderRow}
             columnWrapperStyle={styles.list}
             numColumns={2}
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

  _getRecommendListData = id => {
    let data = []
    Promise.resolve(action.lableList({parentId:id})).then(response => {
      let listData = response.result.data
      listData.map(item => {
        Promise.resolve(action.contentList({categoryId:item.id,limt:4,pageNum:1}).then(response => {
            data.push({
              data: [response.result.data],
              name: item.name,
              id: item.id,
              parentId: item.parentId
            })
        }))
      })
    }).then(()=>{
      setTimeout(()=>{
        this.setState({
          dataSource: data
        })
      },10)
    })
  }

  _getListData = id => {
    Promise.resolve(action.contentList({categoryId:id,limt:20,pageNum:1})).then(response => {
      setTimeout(()=>{
        this.setState({
          dataSource: response.result.data
        })
      },10)
    }).catch((e)=>{
      console.log(e)
    })
  }

  _renderItem = ({ item }) => {
    if(item == ""){
      return (
        <View  style={styles.empty}>
            <Text>暂无数据……</Text>
        </View>
      )
    }
    return (
        <View  style={styles.list}>
            {
                item.map((item, i) => this.renderExpenseItem(item, i))
            }
        </View>
    )
  };

  renderExpenseItem(item, i) {

      return <ShowTimeCell key={i} rowData={item} />
  }


  _renderSectionHeader = ({ section }) => {

    return(
      <View style={styles.tabTitle}>
        <Text style={styles.textTitle}>{section.name}</Text>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={(data) => {
            Actions.movieCategoryList({categoryId: section.id,title:section.name})
          }}
          key={this.props.index}
        >
          <Text style={styles.textMore}>更多</Text>
        </TouchableOpacity>
      </View>

  )}

  _extraUniqueKey(item ,index){
      return "index"+index+item;
  }

  _renderEmpty() {
    return(
      <View style={styles.empty}>
        <Icon name={'fontAwesome|spinner'} size={20} />
        <Text>正在拼命加载中</Text>
      </View>
    )
  }
  _onRefresh = () =>{
    const { id, title } = this.props;
    if(id == 1){
      this._getRecommendListData(id);
      return 
    }
    this._getListData(id)
    this.setState({
      refreshing: false
    })
  }
  render() {
    const { refreshing, dataSource } = this.state
    const { id } = this.props

    return (
      <View style={{flex:1}}>
        <ScrollView 
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={()=>this._onRefresh()}
              tintColor={commonStyle.themeColor}
              title="Loading..."
              colors={[commonStyle.themeColor]}
              progressBackgroundColor="#fff"
            />
          }>
          {id == 132 ? (
            <View>
              <Swiper type="home" />
            </View>
          ):null}
          <View style={styles.content}>
            {dataSource==""?this._renderEmpty():this.renderListView(dataSource)}
          </View>
        </ScrollView>
      </View>
    )
  }
  
  _renderRow = (data) => {
    if(data == ""){
      return (
        <View  style={styles.empty}>
            <Text>暂无数据……</Text>
        </View>
  
      )
    }
    return (
        <ShowTimeCell key={data.index} index={data.index} rowData={data.item} />
    )
  };
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: commonStyle.white,
    paddingLeft: 10, 
    paddingRight: 10,
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
  list: {
      //justifyContent: 'space-around',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between',
  },
  row: {
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      width: (deviceInfo.deviceWidth - 1) / 2,
      height: (deviceInfo.deviceWidth - 1) / 2,
      alignItems: 'center',
      // borderWidth: 0.5,
      // borderRadius: 5,
      // borderColor: '#E6E6E6'
  },
  sectionHeader: {
      marginLeft: 10,
      padding: 6.5,
      fontSize: 12,
      color: '#787878'
  },
  remark: {
      margin: 10,
      fontSize: 10,
      color: '#D2D2D2',
      marginBottom: 10,
      alignSelf: 'center',
  },
  empty: {
    height:100,
    justifyContent: 'center', alignItems: 'center',
  }
});