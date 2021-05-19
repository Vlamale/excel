import {$} from '../../core/dom'
import {Emmiter} from '../../core/Emmiter'
import {StoreSubscriber} from '../../core/StoreSubscriber'
import {updateDate} from '../../redux/action'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emmiter = new Emmiter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emmiter: this.emmiter,
      store: this.store
    }

    this.components = this.components.map( Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)

      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }

  init() {
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}