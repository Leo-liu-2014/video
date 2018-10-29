/**
 * Created by godliu on 2017/9/5.
 */
import {getFetch, postFetch, postFetchForValidator} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {ApiSource} from '../../constants/commonType'

const moviesNum = params => getFetch(`/content/addvideoNum?voideId=${params.id}`, ApiSource.VIDEO)


export default {
  moviesNum
}