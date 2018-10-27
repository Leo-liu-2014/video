/**
 * Created by godliu on 2017/9/6.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import actions from '../../actionCreators/category'

const getCatatList = createAction(type.CATAT_LIST, actions.catatList)
const getLableList = createAction(type.LABEL_LIST, actions.lableList)
const getcontentList = createAction(type.CONTENT_LIST, actions.contentList)


const actionCreators = {
  getCatatList,
  getLableList,
  getcontentList
}

export default {actionCreators}