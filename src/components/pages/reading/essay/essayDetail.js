/**
 * Created by guangqiang on 2017/9/18.
 */
import React, {Component} from 'react'
import {View, StyleSheet, EnhancedListView, ScrollView, Image, TextInput, InteractionManager} from '../../../common'
import {Text, TouchableOpacity} from 'react-native'
import {commonStyle} from '../../../../utils'
import CommentList from '../commentList'
import {articleType} from '../../../../constants/commonType'
import ToolBar from '../bottomToolBar'
import {Icon} from '../../../../utils/icon'
import {BaseComponent} from '../../../base/baseComponent'
import action from '../../../../actionCreators/category'
export default class EssayDetail extends BaseComponent {

  constructor(props) {
    super(props)
    this.state = {
      content: '暂无内容。',
      author: '无名氏',
    }
  }

  navigationBarProps() {
    return {
      title: this.props.title
    }
  }

  componentDidMount() {
    Promise.resolve(action.getNovelDetail({id:this.props.id})).then(response => {
      if(response){
        this.setState({
          content: response.result.data.content
        })
      }
    })
  }

  _render() {
    const { author, content  } = this.state
    const { title } = this.props
    if (title) {
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{marginHorizontal: 20}}>
              <Text style={{marginVertical: 30, fontSize: 25}}>{title}</Text>
              <Text style={{color: commonStyle.textBlockColor, fontSize: 13}}>{`文 / ${author}`}</Text>
              <Text style={{fontSize: 14, color: commonStyle.textBlockColor, lineHeight: 25}}>{content}</Text>
              {/* <Text style={{marginBottom: 20, color: commonStyle.textGrayColor}}>{copyright}</Text> */}
            </View>
          </ScrollView>
        </View>
      )
    } else {
      return <View/>
    }
  }
}

const styles = StyleSheet.create({
  anchor: {
    flexDirection: 'row',
    borderColor: commonStyle.drakGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 20
  },
  author: {
    width: 60,
    borderBottomColor: commonStyle.black,
    borderBottomWidth: 4,
    paddingVertical: 10,
    marginBottom: 10
  },
  attention: {
    borderColor: commonStyle.drakGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginLeft: 10
  }
})