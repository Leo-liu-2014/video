/**
 * Created by godliu on 2017/9/5.
 */
import {getFetch, postFetch, postFetchForValidator} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {ApiSource} from '../../constants/commonType'

const catatList = params => getFetch(PATH.CATAT_LIST, params, ApiSource.VIDEO)
const lableList = params => getFetch(`/content/getLableList?parentId=${params.parentId}`)
const contentList = params => getFetch(`/content/getContentList?pageNum=${params.pageNum}&limt=${params.limt}&catalogId=${params.categoryId}`)
const contentDetail = params => getFetch(`/content/getVoideById?id=${params.id}&limit=8`)
const moviesNum = params => getFetch(`/content/addvideoNum?voideId=${params.id}`)
const appList = params => getFetch(`/appManger/getApp?pageNum=1`)
const getNovelList = params => getFetch(`/content/getNovelById?NovelId=${params.id}?pageNum=1&limit=8`)
const getConfig = params => getFetch(`/user/getInitialization?type=${params.type}`)




export default {
  catatList,
  lableList,
  contentList,
  contentDetail,
  moviesNum,
  appList,
  getNovelList,
  getConfig
}