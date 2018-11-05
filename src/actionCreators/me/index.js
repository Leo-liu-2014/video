/**
 * Created by godliu on 2017/11/25.
 */
import {getFetch, postFetch, postFetchForValidator} from '../../utils/network/request/HttpExtension'
import {PATH} from '../../constants/urls'
import {Required, ValidateUtil} from '../../utils/validatorUtil'
import {RegExpr} from '../../utils'


const login = params =>  postFetch(PATH.USER_LOGIN, params)

const register = params =>  postFetchForValidator(PATH.USER_REGISTER, params)

const loginValidator = () => ({
  validator: {
    data: ValidateUtil([
      {
        func: (params, state, payload) => Required(params.loadinId), msg: '请输入正确的用户名'
      },
      {
        func: (params, state, payload) => Required(params.password), msg: '请输入密码'
      }
    ])
  }
})

const registerValidator = () => ({
  validator: {
    data: ValidateUtil([
      {
        func: (params, state, payload) => Required(params.name), msg: '请输入邮箱'
      },
      {
        func: (params, state, payload) => RegExpr.checkEmail(params.name), msg: '邮箱格式不正确'
      },
      {
        func: (params, state, payload) => Required(params.pwd), msg: '请输入密码'
      }
    ])
  }
})

export default {
  login,
  register,
  loginValidator,
  registerValidator
}