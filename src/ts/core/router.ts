import Navigo from 'navigo'
import { type PlainNode, renderInto } from './render.ts'

export let activeLayout: PlainNode

// For usage description: https://github.com/krasimir/navigo/blob/master/DOCUMENTATION.md#initializing
export const router = new Navigo('/')

export interface RouteConfig {
  layout: PlainNode
  page: PlainNode
}

export function applyRouting (routes: Record<string, RouteConfig>): void {
  for (const path in routes) {
    if (typeof routes[path] === 'undefined') continue
    router.on(path, () => { _showPage(routes[path].layout, routes[path].page) })
  }
  router.resolve()
}

function _showPage (layout: PlainNode, page: PlainNode): void {
  if (activeLayout !== layout) {
    activeLayout = layout
    renderInto('body', layout)
  }
  renderInto('#page', page)
}
