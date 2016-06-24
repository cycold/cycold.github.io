function Vue (options) {
  this._init(options)
}

// install internals
// 注意: 下面的函数都只是定义Vue原型上的方法,没有真正执行语句 (里面的执行语句需要在new Vue时才会执行)
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
miscMixin(Vue)

// install instance APIs
dataAPI(Vue)
domAPI(Vue)
eventsAPI(Vue)
lifecycleAPI(Vue)

export default Vue

`installGlobalAPI(Vue)`  在 new Vue()前面执行
设置: 一些默认 的全局配置
``` 
Vue.options = {
    directives,
    elementDirectives,
    filters,
    transitions: {},
    components: {},
    partials: {},
    replace: true
  }

以上的设置就是在new Vue(opts)中 `mergeOptions()`第一个参数`this.constructor.options`的值
```


在new Vue(opts)执行: 

首先处理opts中的components: 
```
options = this.$options = mergeOptions(
      this.constructor.options,
      options,
      this
)

guardComponents(options)   // 同时验证组件名的合法性(不同是已有的html元素名称并且不能是保留的标签名slot/component/patial)
-->     var components = options.components =
            guardArrayAssets(options.components)
        if (isPlainObject(def)) {
            components[key] = Vue.extend(def)
        }
        如果组件将都是传递的对象,那么就直接调用Vue.extend({})创建组件


        Vue.extend() 不是实例方法 extend()中的this就是指唯一的构造函数Vue


```



```
Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {}
    var Super = this
    var isFirstExtend = Super.cid === 0
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor
    }
    // 获取组件的名称 组件一定要有名称'myComponents'
    var name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production') { // 验证组件名合法?
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characaters and the hyphen.'
        )
        name = null
      }
    }

    // 组件名没有,默认名称为'VueComponent' 
    // 通过各个组件的名称创建不同的组件构造函数,这里在打印日志时,就比较清楚
    var Sub = createClass(name || 'VueComponent')
    Sub.prototype = Object.create(Super.prototype)  // 继承Vue实例方法 (_init....)
    Sub.prototype.constructor = Sub // 设置正确的实例构造方法
    其实
    Sub = function name(opts) {
        this._init(opts)
    }
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )

    Sub['super'] = Super
    // cache constructor
```

```
function createClass (name) {
    /* eslint-disable no-new-func */
    return new Function(
      'return function ' + classify(name) +
      ' (options) { this._init(options) }'
    )()
    /* eslint-enable no-new-func */
  }
```

```
for (key in parent) {
    mergeField(key)
  }
  for (key in child) {   // 比如选项中有传递 ready: fun, 那么最后的options[ready] = 调用求值策略进行重新包装 ready: 可以是数组
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    // 外部传递的值如果是以上strats策略的属性时,就进行重新包装,否则 就直接返回这个属性(defaultStrat),不做修改
    var strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
```

```
strats.init =
strats.created =
strats.ready =
strats.attached =
strats.detached =
strats.beforeCompile =
strats.compiled =
strats.beforeDestroy =
strats.destroyed =
strats.activate = function (parentVal, childVal) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}
```

var options = 
{
    data: {
        username: 'erc'   // 内部将会调用方法进行重新包装
    }
}
当有定义data属性时, 将会调用strats.data进行再包装 options[data] = strats.data(parentVal, options[data], vm , 'data')
```
strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}
```


mergeOptions: 会将所有传进来的参数(options)中的属性重新包装(执行相应函数,本身值作为参数传入)(有包装成数组的,或者对象)

// call init hook
this._callHook('init')

// initialize data observation and scope inheritance.
this._initState()   // 


