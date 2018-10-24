/**
 * Created by guangqiang on 2017/9/5.
 */
import {getFetch, postFetch, postFetchForValidator} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {ApiSource} from '../../constants/commonType'

const catatList = params => getFetch(PATH.CATAT_LIST, params, ApiSource.VIDEO)
const lableList = params => getFetch(`/content/getLableList?parentId=${params.parentId}`, ApiSource.VIDEO)
const contentList = params => getFetch(`/content/getContentList?pageNum=${params.pageNum}&limt=${params.limt}&catalogId=${params.categoryId}`, ApiSource.VIDEO)


export default {
  catatList,
  lableList,
  contentList
}