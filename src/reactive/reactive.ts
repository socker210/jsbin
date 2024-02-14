const reactive = () => {
  let currentObserver = null

  function observe(fn) {
    currentObserver = fn
    fn()
    currentObserver = null
  }

  function observable(obj) {
    Object.keys(obj).forEach((key) => {
      const propObservers = []
      let _value = obj[key]

      Object.defineProperty(obj, key, {
        get() {
          if (currentObserver && !propObservers.includes(currentObserver)) {
            propObservers.push(currentObserver)
          }
          return _value
        },
        set(value) {
          _value = value
          propObservers.forEach((observer) => observer())
        },
      })
    })

    return obj
  }

  const board = observable({
    score1: 10,
    score2: 20,
  })

  observe(() => {
    console.log(board.score1 + board.score2)
  })

  board.score2 = 40
}

export default reactive
