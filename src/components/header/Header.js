import {$} from '../../core/dom'
import {ExcelComponent} from '../../core/ExcelComponent'
import {ActiveRoute} from '../../core/routes/ActiveRoute'
import * as actions from '../../redux/action'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    return `
    <input type="text" class="input" value="${this.store.getState().title}" />

      <div>

        <div class="button" data-button="remove">
          <i href="#" class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i href="#" class="material-icons"data-button="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigation('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigation('')
    }
  }
}