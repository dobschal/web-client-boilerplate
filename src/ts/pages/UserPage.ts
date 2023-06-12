import { currentRoute } from '../core/router.ts'
import { type PlainNode } from '../core/render.ts'

interface UserPageData {
  userId: string
}

export default {
  data: {
    userId: ''
  },
  class: 'page',
  text: 'User {{ userId }}!',
  onCreate (this: PlainNode<UserPageData>) {
    console.log('Page got created...', currentRoute()?.data?.userId, this)
    this.data!.userId = currentRoute()?.data?.userId ?? ''
    this.update()
  }
}
