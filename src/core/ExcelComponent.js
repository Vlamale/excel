import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emmiter = options.emmiter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {

  }

  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emmiter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emmiter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChenged(chenges) {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.inintDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(subscribe => subscribe())
  }
}