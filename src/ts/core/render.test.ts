import { type PlainNode, render } from './render.ts'

it('should render a DIV element by default', () => {
  const element = render({})
  expect(element instanceof HTMLElement).toBe(true)
  expect(element?.tagName).toBe('DIV')
})

it('should render a given attribute', () => {
  const element = render({
    placeholder: 'yeah'
  })
  expect(element instanceof HTMLElement).toBe(true)
  expect(element?.getAttribute('placeholder')).toBe('yeah')
})

it('should render children in correct order', () => {
  const element = render({
    children: [
      {
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '3'
      }
    ]
  })
  expect(element instanceof HTMLElement).toBe(true)
  expect(element?.children.length).toBe(3)
  expect(element?.children[0].id).toBe('1')
  expect(element?.children[1].id).toBe('2')
  expect(element?.children[2].id).toBe('3')
})

it('should not render a children with condition false', () => {
  const element = render({
    children: [
      {
        id: '1'
      },
      {
        id: '2',
        condition: () => false
      },
      {
        id: '3'
      }
    ]
  })
  expect(element instanceof HTMLElement).toBe(true)
  expect(element?.children.length).toBe(2)
  expect(element?.children[0].id).toBe('1')
  expect(element?.children[1].id).toBe('3')
})

it('should render a children at correct position after condition changed to true', () => {
  const data = {
    renderIt: false
  }
  const plainNode: Omit<PlainNode<typeof data>, 'element' | 'update'> = {
    data,
    children: [
      {
        id: '1'
      },
      {
        id: '2',
        condition: ({ renderIt }) => renderIt
      },
      {
        id: '3'
      }
    ]
  }
  const element = render(plainNode)
  expect(element instanceof HTMLElement).toBe(true)
  expect(element?.children.length).toBe(2)
  expect(element?.children[0].id).toBe('1')
  expect(element?.children[1].id).toBe('3')
  data.renderIt = true;
  (plainNode as PlainNode<typeof data>).update()
  expect(element?.children.length).toBe(3)
  expect(element?.children[0].id).toBe('1')
  expect(element?.children[1].id).toBe('2')
  expect(element?.children[2].id).toBe('3')
})
