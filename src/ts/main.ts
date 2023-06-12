import '../scss/style.scss'
import { applyRouting } from './core/router.ts'
import DefaultLayout from './layouts/DefaultLayout.ts'
import HomePage from './pages/HomePage.ts'
import LoginPage from './pages/LoginPage.ts'
import UserPage from './pages/UserPage.ts'

applyRouting({
  '/users/:userId': {
    layout: DefaultLayout,
    page: UserPage
  },
  '/login': {
    layout: DefaultLayout,
    page: LoginPage
  },
  '/': {
    layout: DefaultLayout,
    page: HomePage
  }
})
