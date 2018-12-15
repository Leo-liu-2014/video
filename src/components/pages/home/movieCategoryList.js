/**
 * Created by guangqiang on 2017/10/10.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, ListView, StyleSheet, FlatList, RefreshControl} from 'react-native'
import {commonStyle} from '../../../utils/commonStyle'
import {BaseComponent} from '../../base/baseComponent'
import {Icon} from '../../../utils/icon'
import {Actions} from 'react-native-router-flux'
import ShowTimeCell from './showTime/showTimeCell'
import action from '../../../actionCreators/category'
export default class TrailerList extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
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
    const { categoryId, title } = this.props;
    this._getListData(categoryId)
  }

  _getListData = id => {

    Promise.resolve(action.contentList({categoryId:id,limt:10,pageNum:1})).then(response => {
      console.log(response, 123123)
      this.setState({
        dataSource: response.result.data || []
      })
    }).catch((error) => {
      console.error(error);
    })
  }

  _renderRow = (data, sectionId) => {
    return (
        <ShowTimeCell key={data.index} index={data.index} rowData={data.item} />
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
          <Text style={styles.textMore}>更多></Text>
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
        <Text>暂无数据……</Text>
      </View>
    )
  }

  onRefresh = ()=>{
    coonsole.log('onRefresh');
  }

  _render() {

    return (
      <View style={styles.content}>
        {this.state.dataSource ==""?this._renderEmpty():(
        <FlatList
          data = {this.state.dataSource}
          renderItem={this._renderRow}
          columnWrapperStyle={styles.list}
          numColumns={2}
          keyExtractor = {this._extraUniqueKey}// 每个item的key
          refreshControl={<RefreshControl
            refreshing={false}
            onRefresh={()=>{()=>this.onRefresh()}}
            tintColor='red'
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="gray"/>}
        />
      )}
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