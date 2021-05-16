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

// export class CreateStore {
//   constructor(rootReduser, initialState) {
//     this.rootReduser = rootReduser
//     this.initialState = initialState
//   }
//   _state = this.rootReduser(this.initialState, {type: '__INIT__'})
//   _listeners = []

//   dispatch(action) {
//     _state = rootReduser(_state, action)
//     _listeners.forEach(listener => listener(action))
//   }
//   subscribe(fn) {
//     _listeners.push(fn)
//     return {
//       unsubscribe() {
//         _listeners = _listeners.filter(l => l !== fn)
//       }
//     }
//   }
//   getState() {
//     return _state
//   }
// }
