import { Link } from '../core/elements.ts'

export default {
  class: 'layout',
  children: [{
    tag: 'header',
    children: [{
      tag: 'nav',
      children: [{
        tag: 'h1',
        text: 'Something'
      }, Link('Start', '/'), Link('Login', '/login')]
    }]
  }, {
    id: 'page'
  }]
}
