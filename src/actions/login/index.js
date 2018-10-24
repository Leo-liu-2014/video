/**
 * Created by guangqiang on 2017/11/14.
 */
import {createAction} from 'redux-actions'
import type from '../../constants/actionType'
import ActionCreator from '../../actionCreators/me'

const userLogin = createAction(type.USER_LOGIN, ActionCreator.login, ActionCreator.loginValidator)

const actionCreators = {
  userLogin
}

export default {actionCreators}