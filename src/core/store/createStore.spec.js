import {createStore} from './createStore'

const initialState = {
  count: 0
}

const reduser = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

describe('createStore:', () => {
  let store
  let handler

  beforeEach(() => {
    store = createStore(reduser, initialState)
    handler = jest.fn()
  })

  test('shuld return store object', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).toBeDefined()
  })

  test('shuld return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('shuld return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('shuld change state if action exists', () => {
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('shuld NOT change state if action don\'t exists', () => {
    store.dispatch({type: 'NOT_EXISTING_ACTION'})
    expect(store.getState().count).toBe(0)
  })

  test('shuld call subscriber function', () => {
    store.subscribe(handler)

    store.dispatch({type: 'ADD'})
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('shuld NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)

    sub.unsubscribe()
    store.dispatch({type: 'ADD'})
    expect(handler).not.toHaveBeenCalled()
  })

  test('shuld dispatch in async way', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})