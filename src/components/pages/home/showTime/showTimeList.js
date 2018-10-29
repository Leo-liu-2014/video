import React, {Component} from 'react'
import {View, ListView, Image, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, SectionList} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'
import ShowTimeCell from './showTimeCell'
import deviceInfo from '../../../../utils/deviceInfo'

import action from '../../../../actionCreators/category'

export default class ShowTimeList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      data: [],
      list: []
    }
  }

  componentDidMount(){
    const { id, title } = this.props;
    if(id == 1){
      this.setState({
        data: this._getRecommendListData(id)
      })
    }else{
      this.setState({
        list: this._getListData(id)
      })
    }
  }
  renderListView(dataSource){

    // if(this.props.type==='recommend'){
    //   return(
    //     <ListView
    //       dataSource={dataSource}
    //       renderRow={this._renderRow}
    //       renderSectionHeader={this._renderSectionHeader}
    //     />
    //   )
    // }
    const { id, title } = this.props;
    if(id ==1){
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
              initialNumToRender={2}
              sections={ dataSource }
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
    let data = [];
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
    })
    return data
  }

  _getListData = id => {
    let data = [];
    Promise.resolve(action.contentList({parentId:id,limt:4,pageNum:1})).then(response => {
      console.log(response.result.data, 'adsasdasd')
    }).catch((error) => {
      console.error(error);
    })
    return data
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
      <View style={styles.empty}>
        <Text>暂无数据！</Text>
      </View>
    )
  }
  render() {

    const { data, list } = this.state
    if (data =="") {
      return (
          <View style={{flex:1}}>{this._renderEmpty()}</View>
      );
    }
    return (
      <View style={styles.content}>
        {this.renderListView(data)}
      </View>
    )
  }
  
  _renderRow = (data, sectionId) => {
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
    paddingTop:20,
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



// export const styles = StyleSheet.create({
//   content: {
//     flex: 1,
//     backgroundColor: commonStyle.white,
//     paddingLeft: 10, 
//     paddingRight: 10,
//     paddingTop:20,
//   },
//   sectionHeader: {
//     padding: 10,
//     backgroundColor: '#f0f0f0'
//   },
//   cellContainer: {
//     borderBottomWidth: 1,
//     borderColor: '#dcdcdc',
//     flexDirection:'row',
//     alignItems:'center',
//     padding:15
//   },
//   image: {
//     width: 50,
//     height: 50,
//   },
//   title: {
//     marginLeft: 15,
//   },
//   tabTitle: {
//     flexDirection:'row',  
//     flexWrap:'wrap',  
//     justifyContent:'space-between',
//     height:35,
//     marginTop:10

//   },
//   textTitle: {
//     fontSize:20,
//     color:"#000"
//   },
//   textMore: {
//     color:"#999"
//   },

//   gridContainer: {
//     flexDirection:'row',
//     flexWrap:'wrap',
//     justifyContent:'space-between',
//   },
// });