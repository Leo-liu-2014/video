/**
 * Created by godliu on 2017/9/5.
 */
import {getFetch, postFetch, postFetchForValidator} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {ApiSource} from '../../constants/commonType'

const catatList = params => getFetch(PATH.CATAT_LIST, params, ApiSource.VIDEO)
const lableList = params => getFetch(`/content/getLableList?parentId=${params.parentId}`, ApiSource.VIDEO)
const contentList = params => getFetch(`/content/getContentList?pageNum=${params.pageNum}&limt=${params.limt}&catalogId=${params.categoryId}`, ApiSource.VIDEO)
const contentDetail = params => getFetch(`/content/getVoideById?id=${params.id}&limit=8`, ApiSource.VIDEO)
const moviesNum = params => getFetch(`/content/addvideoNum?voideId=${params.id}`, ApiSource.VIDEO)
const appList = params => getFetch(`/appManger/getApp?pageNum=1`, ApiSource.VIDEO)
const getNovelList = params => getFetch(`/content/getNovelById?NovelId=${params.id}?pageNum=1&limit=8`, ApiSource.VIDEO)
const getConfig = params => getFetch(`/user/getInitialization?type=${params.type}`, ApiSource.VIDEO)




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