/**
 * Created by guangqiang on 2017/10/13.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
export default class Swiper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  _renderPage() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>dadada</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <Text>111</Text>
      </View>
    )
  }
}