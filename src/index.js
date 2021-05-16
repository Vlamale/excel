import './scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import {Excel} from './components/excel/Excel'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/Formula'
import {Table} from './components/table/Table'
import {createStore} from './core/createStore'
import {rootReduser} from './redux/rootReduser'
import {debounce, storage} from './core/utils'
import {initialState} from './redux/initialState'

const store = createStore(rootReduser, initialState)

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()