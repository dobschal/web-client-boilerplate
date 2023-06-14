import { type PlainNode } from '../core/render.ts'
import { post } from '../core/gateway.ts'

interface LoginData {
  username: string
}
export default {
  data: {
    username: ''
  },
  tag: 'form',
  class: 'page',
  children: [
    {
      tag: 'label',
      text: 'Username'
    },
    {
      tag: 'input',
      placeholder: 'Username',
      onInput (this: PlainNode<LoginData>, e: InputEvent) {
        this.data!.username = (e.target as HTMLInputElement).value
        this.update()
      }
    },
    {
      tag: 'button',
      type: 'submit',
      text: 'Send {{ username }}'
    }
  ],
  async onSubmit (e: SubmitEvent) {
    e.preventDefault()
    console.log('Yeah!', this.data.username)
    const response = await post('https://jsonplaceholder.typicode.com/posts', {
      title: 'username',
      body: this.data.username,
      userId: 1
    })
    console.log('Response: ', response)
  }
}
