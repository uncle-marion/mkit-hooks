# mkit-hook 业务中常见的hook

### useState

useState增强版，解决了实时获取状态问题与异步写入state时组件卸载的问题；使用方法与react的useState完全一致

```javascript
// 注意不要与react中的useState冲突，可以使用别名的方式
import {useState} from 'mkit-hooks'

// 组件
export default function Component() {
  // 与react中的useState使用方式一致
  const [state, setState] = useState()

  useEffect(() => {
    // 使用callback方法实时获取最新的状态
    setState('状态变化', (state) => {
      console.log(state, '可以像setState一样，直接获取到最新的state')
    })

    // 异步操作时如果组件已卸载不再写入
    setTimeout(() => {
      setState('组件卸载也不会报错了')
    }, 1000 * 60 * 60 * 24)
  })

  return (
    <div className="docwrap">
      {state}
    </div>
  )
}
```
### useDebounce

防抖的概念是事件处理函数在延迟一段时间后才执行，如果在这个时间段内再次调用，则重新计算执行时间；所以只有在预定的时间内没有再次调用该函数时，函数才会执行。

```javascript
import {useDebounce} from 'mkit-hooks'

// 组件
export default function component() {
  const [state, setState] = useState('初始状态')
  /**
   * 防抖方法
   * 参数一： 需要实现防抖的方法
   * 参数二： 防抖的有效时间
   */
  const fun = useDebounce(() => {
    setState('这个状态被防抖了，只有最后一次点击才会更新')
  }, 500)

  // 组件中直接调用方法即可实现防抖
  return (
    <div className="docwrap">
      <div>{state}</div>
      <button onClick={fun}>点击改变上面的文字</button>
    </div>
  )
}
```

### useDebounceState

状态防抖，参考useState的实现方式，直接对改变状态的方法进行防抖处理

```javascript
import {useDebounceState} from 'mkit-hooks'

// 组件
export default function component() {
  /**
   * 防抖方法
   * 参数一： 需要实现防抖的方法
   * 参数二： 防抖的有效时间
   */
  const [state, setState] = useDebounceState('初始状态', 500)

  // 组件中直接调用方法即可实现防抖
  return (
    <div className="docwrap">
      <div>{state}</div>
      <button
        onClick={() => {
          setState('这个状态被防抖了，只有最后一次点击才会更新')
        }}
      >点击改变上面的文字<button>
    </div>
  )
}
```

### useThrottle

节流的概念是同一个时间段内只能执行一次方法，如果这个方法被执行过了，则必须要等到下一个时间段内才会被执行；

```javascript
import {useThrottle} from 'mkit-hooks'

// 组件
export default function component() {
  const [state, setState] = useState('初始状态')
  const [coord, setCoord] = useState({x: 0, y: 0})
  const count = useRef(0)
  /**
   * 防抖方法
   * 参数一： 需要实现防抖的方法
   * 参数二： 防抖的有效时间
   */
  const fun = useThrottle(e => {
    if (!e) return
    count.current += 1
    setState(`这个状态被节流了，第${count.current}次执行`)
    setCoord({
      x: e.clientX,
      y: e.clientY
    })
  }, 500)

  useEffect(() => {
    // 监听鼠标的移动
    document.addEventListener('mousemove', fun)
    return () => {
      // 组件卸载时需要清除事件！！
      document.removeEventListener('mousemove', fun)
    }
  }, [])

  // 组件中直接调用方法即可实现防抖
  return (
    <div className="docwrap">
      <div>当前鼠标的位置：x: {coord.x}, y: {coord.y}。</div>
      <div>{state}</div>
    </div>
  )
}
```

### useThrottleState

状态节流，参考useState的方式，直接对状态的改变方法进行节流操作

```javascript
import {useThrottleState} from 'mkit-hooks'

// 组件
export default function component() {
  /**
   * 防抖方法
   * 参数一： 需要实现防抖的方法
   * 参数二： 防抖的有效时间
   */
  const [state, setState] = useThrottleState('初始状态', 500)

  const listenerMove = useCallback(e => {
    setState(e => {
      if (e) return {
        x: e.clientX,
        y: e.clientY
      }
    })
  }, [])

  useEffect(() => {
    // 监听鼠标的移动
    document.addEventListener('mousemove', listenerMove)
    return () => {
      // 组件卸载时需要清除事件！！
      document.removeEventListener('mousemove', listenerMove)
    }
  }, [])

  // 组件中直接调用方法即可实现防抖
  return (
    <div className="docwrap">
      <div>当前鼠标的位置：x: {coord.x}, y: {coord.y}。</div>
    </div>
  )
}
```

### useMounted

```javascript
import {useMounted} from 'mkit-hooks'
// 组件
export default function component() {
  /**
   * 防抖方法
   * 参数一： 需要实现防抖的方法
   * 参数二： 防抖的有效时间
   */
  const [state, setState] = useState('初始状态')

  useEffect(() => {
    // 监听鼠标的移动
    document.addEventListener('mousemove', listenerMove)
    return () => {
      // 组件卸载时需要清除事件！！
      document.removeEventListener('mousemove', listenerMove)
    }
  }, [])

  // 组件中直接调用方法即可实现防抖
  return (
    <div className="docwrap">
      <div>当前鼠标的位置：x: {coord.x}, y: {coord.y}。</div>
    </div>
  )
}

```

### useForceRender

为了解决某些时候我们更新外部状态或ref中的状态，react无法感知到状态变化而不更新的问题

```javascript
import {useForceRender} from 'mkit-hooks'

export default function component() {
  /**
   * 防抖方法
   * 参数一： 需要实现防抖的方法
   * 参数二： 防抖的有效时间
   */
  const state = useRef('初始状态')
  const update = useForceRender()

  useEffect(() => {
    state.current = '改变后的状态'
    update()
  }, [])

  // 组件中直接调用方法即可实现防抖
  return (
    <div className="docwrap">
      <div>{state.current}</div>
    </div>
  )
}
```


