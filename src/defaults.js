/**
 * 用来添加默认的选项
 * */
import { effects, addEffect } from './effects'

// 全局的options，执行defaults后会对其重写
export const options = {
  // global initial state
  // initialState: undefined,

  // Should be one of ['browser', 'hash', 'memory']
  // Learn more: https://github.com/ReactTraining/history/blob/master/README.md
  historyMode: 'browser',

  // A list of the standard Redux middleware
  middlewares: [],

  // `options.reducers` will be directly handled by `combineReducers`,
  // so reducers defined here must be standard Redux reducer:
  // 注意在这定义的是标准的reducers
  // reducers: {
  //   add: (state, action) => {}
  // }
  //
  reducers: {},

  // An overwrite of the existing effect handler
  addEffect: addEffect(effects),

}

const historyModes = ['browser', 'hash', 'memory']

export default function defaults(opts = {}) {

  // 提取参数，也就是说的defaults里只能定义这三个属性
  const {
    historyMode,
    middlewares,
    addEffect
  } = opts

  // 验证
  if (historyMode && !historyModes.includes(historyMode)) {
    throw new Error(`historyMode "${historyMode}" is invalid, must be one of ${historyModes.join(', ')}!`)
  }

  if (middlewares && !Array.isArray(middlewares)) {
    throw new Error(`middlewares "${middlewares}" is invalid, must be an Array!`)
  }

  // addEffect 必须是一个返回函数的高阶函数
  if (addEffect) {
    if (typeof addEffect !== 'function' || typeof addEffect({}) !== 'function') {
      throw new Error(`addEffect "${addEffect}" is invalid, must be a function that returns a function`)
    } else {
      // create effects handler with initial effects object
      opts.addEffect = opts.addEffect(effects)
    }
  }
  // 写入options
  Object.keys(opts).forEach(key => {
    options[key] = opts[key]
  })
}
