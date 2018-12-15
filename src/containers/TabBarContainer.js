/**
 * Created by godliu on 2018/10/20.
 */
import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Application from '../components/pages/application/application'
import Reading from '../components/pages/reading/reading'
import Category from '../components/pages/category/categoryList'
import Home from '../components/pages/home/home'
import Me from '../components/pages/me/me'
import {Icon} from '../utils/icon'
import {commonStyle} from '../utils'
import deviceInfo from '../utils/deviceInfo'
import Collection from '../components/pages/collection/index'

export default class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Home'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator
            tabBarStyle={{height: commonStyle.tabBarHeight, paddingBottom: deviceInfo.isIphoneX ? 34 : 0}}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Home'}
            title="首页"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'fontAwesome|home'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'fontAwesome|home'} size={20} color={commonStyle.themeColor}/>}
            onPress={() => this.setState({ selectedTab: 'Home' })}>
            <Home />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Music'}
            title="分类"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'fontAwesome|align-justify'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'fontAwesome|align-justify'} size={20} color={commonStyle.themeColor}/>}
            onPress={() => this.setState({ selectedTab: 'Music' })}>
            <Category />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Collection'}
            title="收藏"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'fontAwesome|heart'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'fontAwesome|heart'} size={20} color={commonStyle.themeColor}/>}
            onPress={() => this.setState({ selectedTab: 'Collection' })}>
            <Collection />
          </TabNavigator.Item>

          {/* <TabNavigator.Item
            selected={this.state.selectedTab === 'Picture'}
            title="应用"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_Picture_o'} size={22} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_Picture_o'} size={22} color={commonStyle.themeColor}/>}
            onPress={() => this.setState({ selectedTab: 'Picture' })}>
            <Application />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Reading'}
            title="小说"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_article_o'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_article_o'} size={20} color={commonStyle.themeColor}/>}
            onPress={() => this.setState({ selectedTab: 'Reading' })}>
            <Reading/>
          </TabNavigator.Item> */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Me'}
            title="我的"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Icon name={'oneIcon|tb_mine_o'} size={20} color={commonStyle.textGrayColor}/>}
            renderSelectedIcon={() => <Icon name={'oneIcon|tb_mine_o'} size={20} color={commonStyle.themeColor}/>}
            onPress={() => this.setState({ selectedTab: 'Me' })}>
            <Me/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabText: {
    fontSize: 11,
    color: commonStyle.textGrayColor,
    marginBottom: 5
  },
  selectedTabText: {
    fontSize: 11,
    color: commonStyle.themeColor,
    marginBottom: 5
  }
})