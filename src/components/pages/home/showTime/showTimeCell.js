import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../../utils/commonStyle'
import {Icon} from '../../../../utils/icon'
import deviceInfo from '../../../../utils/deviceInfo'
import {Actions} from 'react-native-router-flux'
import {storage} from '../../../../utils'
export default class ShowTimeCell extends Component {

  testStorage() {
    storage.load('userInfo', (data) => {
    })
  }

  render() {
    let data = this.props.rowData
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          // Actions.movieDetail({id: data.id})
          // Actions.moviePlayer({url: data.url, title: data.title, remark: data.remark, isDisplay:data.isDispaly})

          Actions.moviePlayer({id: data.id})

        }}
        key={this.props.index}
      >
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: commonStyle.clear}}>
          <Image
            style={styles.img}
            source={{uri: data.img}}
          />
          <View style={{position: commonStyle.absolute, top:25}}>
            <Icon name={'oneIcon|play_cycle_o'} size={25} color={commonStyle.white} />
          </View>
          <View style={{position: commonStyle.absolute, top:0, right:0}}>
            <Text style={{color: commonStyle.white, backgroundColor:"#caa361", fontSize:11, paddingLeft:2, paddingRight:2}} >{data.type_tips}</Text>
          </View>
          <View style={{position: commonStyle.absolute, bottom:30, right:0}}>
            <Text style={{color: commonStyle.white, fontSize:11, paddingLeft:2, paddingRight:2}}>{data.volume}</Text>
          </View>
          <View style={{height:30}}>
            <Text numberOfLines={1} style={{fontSize: 12,alignItems:'flex-start',textAlign: "left", marginVertical: 6, color: commonStyle.textBlockColor}}>
              {data.title ? (data.title.length > 10 ? data.title.substr(0, 10) + "..." : data.title) : ""}
            </Text>
          </View> 
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  img: {
    width: deviceInfo.deviceWidth / 2.2,
    height: 80,
  },
  gridItem: {
    alignItems:'flex-start',
    justifyContent:'center',
    width: deviceInfo.deviceWidth / 2.2,
    height: 110,
  },
})