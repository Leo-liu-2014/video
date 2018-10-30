/**
 * Created by godliu on 2018/10/27.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import deviceInfo from '../../../utils/deviceInfo'

const data = [
  {title:"111", src:"https://ykimg.alicdn.com/product/image/2018-10-26/a2d91c58f06f452099f238ae8b246ba7.jpg"},
  {title:"222", src:"https://ykimg.alicdn.com/product/image/2018-10-26/bf9d10f65e3e66e66e5e8157196f5bc0.jpg"},
  {title:"333", src:"https://ykimg.alicdn.com/product/image/2018-10-26/f79c866dcead1bb8c1b91a70850d498f.jpg"},
  {title:"333", src:"https://ykimg.alicdn.com/product/image/2018-10-26/f79c866dcead1bb8c1b91a70850d498f.jpg"},
  
]

export default class Swiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      activeSlide:0
    }
  }
  componentDidMount(){
  }

  get pagination () {
    const { entries, activeSlide } = this.state;
      return (
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.pagenation}
            dotStyle={{
                width: 10,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: '#f25d8e'
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: '#fff'
            }}
            inactiveDotOpacity={1}
          />
      );
  }

  _renderItem ({item, index}) {
    return (
        <View style={styles.slide}>
            <Image
              style={styles.img}
              source={{uri: item.src}}
            />
        </View>
    );
  }


  render() {
    
    return (
      <View style={styles.content}>
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={this._renderItem}
              sliderWidth={deviceInfo.deviceWidth}
              itemWidth={deviceInfo.deviceWidth}
              bullets={true}  //显示小圆点
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            {this.pagination}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  content: {
    flex:1,
    height:150,
  },
  img: {
    width:(deviceInfo.deviceWidth),
    height:150
  },
  pagenation: {
    position:"absolute",
    // alignItems:"center",
    // justifyContent:"center",
    top:100,
    right:10,
  },
});
