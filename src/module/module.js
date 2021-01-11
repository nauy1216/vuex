import { forEachValue } from '../util'

// Base data struct for store's module, package with some attribute and method
export default class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    // 存放子模块
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    // 传入的options对象
    this._rawModule = rawModule
    // module定义的state
    const rawState = rawModule.state

    // Store the origin module's state
    // state可能是一个function，模块复用的时候需要定义成function
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  // 是否使用了namespace
  get namespaced () {
    return !!this._rawModule.namespaced
  }

  // 添加子模块
  addChild (key, module) {
    this._children[key] = module
  }

  /**
   * 移除子模块
   * @param {String} key 
   */
  removeChild (key) {
    delete this._children[key]
  }

  /**
   * 获取子模块
   * @param {String} key 
   */
  getChild (key) {
    return this._children[key]
  }

  /**
   * 是否有某个模块
   * @param {String} key 
   */
  hasChild (key) {
    return key in this._children
  }

  /**
   * 更新模块
   * @param {Object} rawModule 
   */
  update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  /**
   * 遍历子模块
   * @param {Function} fn 
   */
  forEachChild (fn) {
    forEachValue(this._children, fn)
  }

  /**
   * 遍历getter
   * @param {Function} fn 
   */
  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  /**
   * 遍历action
   * @param {Function} fn 
   */
  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  /**
   * 遍历mutation
   * @param {Function} fn 
   */
  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
