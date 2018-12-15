/**
 * Created by guangqiang on 2017/9/7.
 */
import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Slider, ActivityIndicator, Modal, Platform, Image, StatusBar} from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import {commonStyle} from '../../../utils/commonStyle'
import {Icon} from '../../../utils/icon'
import {Actions} from 'react-native-router-flux'
import {formatTime} from '../../../utils/formatTime'
import deviceInfo from '../../../utils/deviceInfo'
import {MessageBarManager} from 'react-native-message-bar'
import {StyleSheet} from '../../common'
import ShowTimeCell from './showTime/showTimeCell'

import { RootHUD } from '../../../utils/progressHUD'

import action from '../../../actionCreators/category'
import AppInfo from '../../../../config';

const playerHeight = 250

export default class MoviePlayer extends Component {

  constructor(props) {
    super(props)
    this.player = null
    this.state = {
      rate: 1,
      slideValue: 0.00,
      currentTime: 0.00,
      duration: 0.00,
      paused: false,
      playIcon: 'music_paused_o',
      isTouchedScreen: true,
      modalVisible: true,
      isLock: false,
      isDisplay: false,
      videoUrl:"",
      videoTitle:"暂无视频.",
      videoRemark:"暂无介绍。" ,
      recommendData: [],
      isloading:true,
      isStore: false
      
    }
  }

  componentWillMount() {
    const init = Orientation.getInitialOrientation()
    this.setState({
      init,
      orientation: init,
      specificOrientation: init,
    })
  }

  componentDidMount() {

    Orientation.addOrientationListener(this._updateOrientation)
    Orientation.addSpecificOrientationListener(this._updateSpecificOrientation)

    Promise.resolve(action.contentDetail({id:this.props.id})).then(response => {
      const { data, video:{ name, url, remark, isDispaly, isStore, numlook }} = response.result;
      this.setState({
        videoTitle: name,
        videoUrl: url,
        videoTitle: name, 
        videoRemark: remark,
        isDisplay: true,
        isStore: isStore?isStore:false,
        recommendData: data,
        numlook: numlook
      })
    })
    
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._updateOrientation)
    Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation)
  }

  _updateOrientation = orientation => this.setState({ orientation })
  _updateSpecificOrientation = specificOrientation => this.setState({ specificOrientation })

  loadStart(data) {
    console.log(data, 'load start')
  }

  setDuration(duration) {
    
    //播放成功 增加播放次数
    this.setState({
      isloading: false
    })
    action.moviesNum({id:this.props.id})
    this.setState({duration: duration.duration})
  }

  addStore(){
    action.addStore({id:this.props.id}).then((res)=>{
      if(res.result.state){
        this.setState({
          isStore: !this.state.isStore
        })
      }
    })
  }

  setTime(data) {
    let sliderValue = parseInt(this.state.currentTime)
    this.setState({
      slideValue: sliderValue,
      currentTime: data.currentTime,
      modalVisible: false
    })
  }

  onEnd(data) {
    this.player.seek(0)
    console.log(data, 'onEnd')
  }

  videoError(error) {
    this.showMessageBar('播放器报错啦！')(error.error.domain)('error')
    this.setState({
      modalVisible: false
    })
  }

  onBuffer(data) {
    console.log(data, 'onBuffer')
  }

  onTimedMetadata(data) {
    console.log(data, 'onTimedMetadata')
  }

  showMessageBar = title => msg => type => {
    MessageBarManager.showAlert({
      title: title,
      message: msg,
      alertType: type,
    })
  }

  play() {
    this.setState({
      paused: !this.state.paused,
      playIcon: this.state.paused ? 'music_paused_o' : 'music_playing_s'
    })
  }

  renderModal() {
    return (
      <Modal
        animationType={"none"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => alert("Modal has been closed.")}
      >
        <View style={styles.indicator}>
          <ActivityIndicator
            animating={true}
            style={[{height: 80}]}
            color={commonStyle.red}
            size="large"
          />
        </View>
      </Modal>
    )
  }
  renderRecommendList(data){
    data.map(item=>{
      return(
        <TouchableOpacity onPress={()=>{Actions.moviePlayer({id: item.id})}} style={styles.recommendListDetail}>
              <Image
                style={styles.img}
                source={{uri: item.img}}
              />
              <Text numberOfLines={1} style={{fontSize: 12,alignItems:'flex-start',textAlign: "left", marginVertical: 6, color: commonStyle.textBlockColor}}>
                {item.name}
              </Text>
        </TouchableOpacity>
      )
    })
  }

  formateUrl(url){
    if(url.indexOf("http") != -1){
      return url
    }
    return AppInfo.appDomain + url
  }

  render() {
    const {orientation, isLock, videoTitle, videoUrl, isDisplay, isStore, videoRemark, recommendData, isloading, numlook } = this.state
    console.log(this.formateUrl(videoUrl), 'aaaaa')
    return (
      <View style={{flex:1}}>
        <StatusBar hidden={true} />
        {/* 视频播放类型 */}
        {isDisplay?
        <TouchableOpacity
          style={[styles.movieContainer, {height: orientation === 'PORTRAIT' ? playerHeight : deviceInfo.deviceWidth,
            marginTop: orientation === 'PORTRAIT' ? Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 40 : 20) : 0 : 0}]}
            onPress={() => this.setState({isTouchedScreen: !this.state.isTouchedScreen})}
            activeOpacity={1}>
            {
              isDisplay?(<Video 
                source={{uri: this.formateUrl(videoUrl)}}
                // source={{uri:"http://classrecord.mmears.com/2018102709000000000309654/2018102709000000000309654.mp4"}}
                ref={ref => this.player = ref}
                rate={this.state.rate}
                volume={1.0}
                muted={false}
                paused={this.state.paused}
                resizeMode="cover"
                repeat={true}
                playInBackground={true}
                playWhenInactive={false}
                ignoreSilentSwitch={"ignore"}
                progressUpdateInterval={250.0}
                onLoadStart={(data) => this.loadStart(data)}
                onLoad={data => this.setDuration(data)}
                onProgress={(data) => this.setTime(data)}
                onEnd={(data) => this.onEnd(data)}
                onError={(data) => this.videoError(data)}
                onBuffer={(data) => this.onBuffer(data)}
                onTimedMetadata={(data) => this.onTimedMetadata(data)}
                style={[styles.videoPlayer]}
            /> ): <View />
            }
          {
              isloading?<View style={styles.loading}><Text style={{color:"#fff"}}>视频加载中……</Text></View>:null
          }
          
          {
            this.state.isTouchedScreen && !isLock?
              <View style={styles.navContentHeaderStyle}>
                <View style={{flexDirection: 'row', alignItems: commonStyle.center, flex: 1}}>
                  <TouchableOpacity
                    style={{backgroundColor: commonStyle.clear, paddingLeft:5, paddingRight:5}}
                    onPress={orientation === 'PORTRAIT' ? () => Actions.pop() : Orientation.lockToPortrait}>
                    <Icon name={'oneIcon|nav_back_o'} size={18} color={commonStyle.white}/>
                  </TouchableOpacity>
                  <Text style={{backgroundColor: commonStyle.clear, color: commonStyle.white, marginLeft: 10}}>{videoTitle}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: commonStyle.center, justifyContent: commonStyle.between}}>
                  <TouchableOpacity
                    style={styles.navToolBar}
                    onPress={() => this.addStore()}>
                    {/* <Icon name={'oneIcon|tv_o'} size={20} color={commonStyle.white}/> */}
                    {/* <Text style={{color:"#fff"}}>{isStore?"取消收藏":"收藏"}</Text> */}
                    <Icon name={'fontAwesome|heart'} size={18} color={isStore?commonStyle.themeColor:commonStyle.white}/>
                  </TouchableOpacity>
                </View>
              </View> : <View/>
          }
          {
            orientation !== 'PORTRAIT' ?
              <TouchableOpacity
                style={{marginHorizontal: 10, backgroundColor: commonStyle.clear, width: 30, height: 30, alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                onPress={() => this.setState({isLock: !this.state.isLock})}
              >
                <Icon name={`oneIcon|${this.state.isLock ? 'locked_o' : 'unlocked_o'}`} size={20} color={commonStyle.white} style={{backgroundColor: commonStyle.blue}}/>
              </TouchableOpacity> : null
          }
          {
            this.state.isTouchedScreen && !isLock  && !isloading ?
              <View style={[styles.toolBarStyle, {marginBottom: Platform.OS === 'ios' ? 0 : orientation !== 'PORTRAIT' ? 25 : 0}]}>
                <TouchableOpacity onPress={() => this.play()}>
                  <Icon name={`oneIcon|${this.state.playIcon}`} size={18} color={commonStyle.white}/>
                </TouchableOpacity>
                <View style={styles.progressStyle}>
                  <Text style={styles.timeStyle}>{formatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                  <Slider
                    style={styles.slider}
                    value={this.state.slideValue}
                    maximumValue={this.state.duration}
                    minimumTrackTintColor={commonStyle.themeColor}
                    maximumTrackTintColor={commonStyle.iconGray}
                    step={1}
                    onValueChange={value => this.setState({currentTime: value})}
                    onSlidingComplete={value => this.player.seek(value)}
                  />
                  <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: 35}}>
                    <Text style={{color: commonStyle.white, fontSize: 12}}>{formatTime.formatMediaTime(Math.floor(this.state.duration))}</Text>
                  </View>
                </View>
                {
                  orientation === 'PORTRAIT' ?
                    <TouchableOpacity onPress={Orientation.lockToLandscapeLeft}>
                      <Icon name={'oneIcon|scale_o'} size={18} color={commonStyle.white}/>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={Orientation.lockToPortrait}>
                      <Icon name={'oneIcon|shrink_o'} size={18} color={commonStyle.white}/>
                    </TouchableOpacity>
                }
              </View> : <View style={{height: 40}}/>
          }
        </TouchableOpacity>
        :(
          <View style={{flex:1}}>
            <View style={styles.navContentHeaderStyle}>
                  <View style={{flexDirection: 'row', alignItems: commonStyle.center, flex: 1}}>
                    <TouchableOpacity
                      style={{backgroundColor: commonStyle.clear}}
                      onPress={orientation === 'PORTRAIT' ? () => Actions.pop() : Orientation.lockToPortrait}>
                      <Icon name={'oneIcon|nav_back_o'} size={18} color={commonStyle.white}/>
                    </TouchableOpacity>
                    <Text style={{backgroundColor: commonStyle.clear, color: commonStyle.white, marginLeft: 10}}>{videoTitle}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: commonStyle.center, justifyContent: commonStyle.between}}>
                    <TouchableOpacity
                      style={styles.navToolBar}
                      onPress={() => alert('关注视频')}>
                      {/* <Icon name={'oneIcon|tv_o'} size={20} color={commonStyle.white}/> */}
                      <Text style={{color:"#fff"}}>已关注</Text>
                    </TouchableOpacity>
                  </View>
            </View>
            <View style={{flex:1, height:100,backgroundColor:"#000",justifyContent: 'center', alignItems: 'center',}}>
                <TouchableOpacity
                  style={{backgroundColor: commonStyle.clear}}
                  onPress={() => Actions.pop()}>
                    <Text style={{color:commonStyle.white}}>请升级VIP</Text>
                </TouchableOpacity>
            </View>
          </View>
        )}
        <ScrollView >
          <View style={styles.detailContent}>
            <Text style={{color: commonStyle.textBlockColor, lineHeight: 20}}>{`详细介绍： ${videoRemark}`}</Text>
            <Text style={{color: commonStyle.textBlockColor, lineHeight: 20}}>{`观看次数： ${numlook}次`}</Text>
          </View>
          {recommendData==""?<View /> :(
            <View style={styles.recommend}>
              <Text style={styles.recommendText}>热门推荐</Text>
              <View style={styles.recommendList}>
                {recommendData.map((item, index)=>{
                  return (
                      <ShowTimeCell key={`recommend${index}`} index={`recommend${index}`} rowData={ item } />
                  )
                  
                    // return(
                    //   <TouchableOpacity key={`recommend${index}`} onPress={()=>{Actions.moviePlayer({id: item.id})}} style={styles.recommendListDetail}>
                    //         <Image
                    //           style={styles.img}
                    //           source={{uri: item.img}}
                    //         />
                    //         <Text numberOfLines={1} style={{fontSize: 12,alignItems:'flex-start',textAlign: "left", marginVertical: 6, color: commonStyle.textBlockColor}}>
                    //           {item.name}
                    //         </Text>
                    //   </TouchableOpacity>
                    // )
                  })
                }
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  movieContainer: {
    justifyContent: 'space-between',
    backgroundColor: '#000'
  },
  loading : {
    flexDirection: 'row',
    position:'absolute',
    alignItems: 'center',
    justifyContent:'center',
    top:120,
    left: (deviceInfo.deviceWidth / 2.5)
  },
  videoPlayer: {
    flex:1
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  navContentStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: commonStyle.black,
    
  },
  navContentHeaderStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position:'absolute',
    top:0,
    width:deviceInfo.deviceWidth,
  },
  toolBarStyle: {
    backgroundColor: commonStyle.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    marginTop: 10,
    height: 30,
    // position:"absolute",
    // top:300
  },
  timeStyle: {
    width: 35,
    color: commonStyle.white,
    fontSize: 12
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
    height: 20
  },
  progressStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10
  },
  indicator: {
    height: playerHeight,
    width: deviceInfo.deviceWidth,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navToolBar: {
    backgroundColor: commonStyle.clear,
    marginHorizontal: 5
  },
  detailContent: {
    padding: 10,
    backgroundColor: commonStyle.white,
    borderTopWidth: 10,
    borderTopColor: commonStyle.lineColor,
    borderBottomWidth: 10,
    borderBottomColor: commonStyle.lineColor
  },
  recommend: {
    padding: 10,
    backgroundColor: commonStyle.white,
    borderTopWidth: 10,
    borderTopColor: commonStyle.lineColor,
    borderBottomWidth: 10,
    borderBottomColor: commonStyle.lineColor
  },
  recommendText: {
    fontSize:20,
    marginBottom:5,
  },
  recommendList: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  img: {
    width: deviceInfo.deviceWidth / 2.2,
    height: 80,
  },
  recommendListDetail:{
    marginBottom:10
  }
})