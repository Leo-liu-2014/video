import React, {Component} from "react"
import store from '../store'
import {Provider, connect} from 'react-redux'
import {Scene, Router, Actions, Reducer, ActionConst, Modal, Stack, Lightbox} from "react-native-router-flux"
import {View, Platform,  Alert, Linking, NetInfo} from "react-native"
import Button from "react-native-button";
import Action from '../actions'
import {dispatch} from '../utils/venilog/dispatchLog'
import type from '../constants/actionType'
import {commonStyle} from '../utils/commonStyle'

import Author from '../components/pages/me/author'

import Loading from '../utils/progressHUD/progressHUD'
import MessageBar from "../utils/messageBar/MessageBar"

import CustomComp from '../components/pages/demoPage/TestCustomUIComponent'


import TabBar from './TabBarContainer'
import ApplicationDetail from '../components/pages/application/applicationDetail'

import MoviePlayer from '../components/pages/home/moviePlayer'
import MovieCategoryList from '../components/pages/home/movieCategoryList'


import CategoryListLabel from '../components/pages/category/categoryListLabel'


import EssayDetail from '../components/pages/reading/essay/essayDetail'
import SerialDetail from '../components/pages/reading/serial/serialDetail'
import QuestionDetail from '../components/pages/reading/question/questionDetail'
import ArticleList from '../components/pages/reading/readingArticleList'

import UserLogin from '../components/pages/me/login/login'
import UserRegister from '../components/pages/me/register/register'
import Setting from '../components/pages/me/setting'
import UserInfo from '../components/pages/me/userInfo'

import SelectorList from '../components/common/selector'
import WebView from '../components/common/webView'

//import SplashScreen from '../native_modules/SplashScreen';
import AppInfo from '../../config/index';

// 消息通知栏组件
import InitMessage from '../components/pages/base/message'

//获取版本
import action from '../actionCreators/category'

//storage
import {Icon, storage} from '../utils'




const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    action.type !== type.REACT_NATIVE_ROUTER_FLUX_SET_PARAMS ? dispatch(state)(action) : null
    return defaultReducer(state, action)
  }
}

const getSceneStyle = () => ({
  backgroundColor: "white",
  shadowOpacity: 1,
  shadowRadius: 3,
})

const scenes = Actions.create(
  <Scene key="root">
    <Modal key="modal" hideNavBar>
      <Lightbox key="lightbox" hideNavBar={true}>
        <Stack key="init" back>
          <Scene key="main" initial back={false} hideNavBar component={TabBar}/>
          <Scene key="applicationDetail" hideNavBar component={connect(
            (state) => state.picture.piclist,
            Action.dispatch('picture')
          )(ApplicationDetail)}/>
          
          <Scene key="moviePlayer" hideNavBar component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(MoviePlayer)}/>

          <Scene key="movieCategoryList" hideNavBar component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(MovieCategoryList)}/>

          <Scene key="categoryListLabel" hideNavBar component={connect(
            (state) => state.movie.movieList,
            Action.dispatch('movie')
          )(CategoryListLabel)}/>


          <Scene key='essayDetail' hideNavBar component={connect(
            (state) => state.reading.essay,
            Action.dispatch('reading')
          )(EssayDetail)}/>

          <Scene key='serialDetail' hideNavBar component={connect(
            (state) => state.reading.serial,
            Action.dispatch('reading')
          )(SerialDetail)}/>

          <Scene key='questionDetail' hideNavBar component={connect(
            (state) => state.reading.question,
            Action.dispatch('reading')
          )(QuestionDetail)}/>

          <Scene key='articleList' hideNavBar component={connect(
            (state) => state.reading.reading,
            Action.dispatch('reading')
          )(ArticleList)}/>

          <Scene key='userLogin' hideNavBar component={connect(
            (state) => state.me.login,
            Action.dispatch(['login', 'openChat'])
          )(UserLogin)}/>

          <Scene key='userRegister' hideNavBar component={connect(
            state => state.me.register,
            Action.dispatch('register')
          )(UserRegister)}/>

          <Scene key='setting' hideNavBar component={connect(
            state => state.me.register,
            Action.dispatch('register')
          )(Setting)}/>

          <Scene key='userInfo' hideNavBar component={UserInfo}/>

          <Scene key="author" title="作者" hideNavBar component={Author}/>

          <Scene key='selector' hideNavBar component={SelectorList}/>

          <Scene key="webView" hideNavBar component={WebView}/>

        </Stack>

        <Scene key='loading' component={connect(
          (state) => state.common.loading
        )(Loading)}/>
        <Scene key="message" component={InitMessage}/>
        
      </Lightbox>

    </Modal>
  </Scene>
)

class App extends Component {
  // componentDidMount(){
  //   if(Platform.OS === 'android')
  //       SplashScreen.hide();
  // }
  componentWillMount(){
      storage.load('userInfo', (response) => {
        if(!response){
          Actions.userLogin()
        }
      })
    
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    });
    function handleFirstConnectivityChange(isConnected) {
      console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
      NetInfo.isConnected.removeEventListener(
        'connectionChange',
        handleFirstConnectivityChange
      );
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }
  componentDidMount(){
    
    /* 版本检查 */
    const devices = Platform.OS==="android"?1:0;

    setTimeout(()=>{
      // Actions.message("网站正式使用了！！！谢谢支持")
      // Actions.blur()
    },200)
    Promise.resolve(action.getConfig({type:devices})).then(response => {
      //const { version, domain, necessary } = response.result.data
      // if(response.code ==0){
      //   //判断更新 
      //   Alert.alert(
      //     '更新通知',
      //     `当前版本：${AppInfo.appVersion}，最新版本${version}`,
      //     [
      //       {text: 'OK', onPress: () => {
      //         console.log('baidu')
      //         // Linking.openURL('https:www.baidu.com');
      //       }},
      //     ]
      //   )
      // }
    })
    
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Router
          scenes={scenes}
          createReducer={reducerCreate}
          tintColor='white'
          getSceneStyle={getSceneStyle}
        />
        <MessageBar />
      </View>
    )
  }
}

const initApp = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

export default initApp