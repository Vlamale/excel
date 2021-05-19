import './scss/index.scss'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import {Router} from './core/routes/Router'
import {DashboardPage} from './pages/DashboardPage'
import {ExcelPage} from './pages/ExcelPage'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})