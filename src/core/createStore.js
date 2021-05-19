export function createStore(rootReduser, initialState) {
  let state = rootReduser({...initialState}, {type: '__INIT__'})
  let listeners = []
  return {
    dispatch(action) {
      state = rootReduser(state, action)
      listeners.forEach(listener => listener(state))
    },
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        }
      }
    },
    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}