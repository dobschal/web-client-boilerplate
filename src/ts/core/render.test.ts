import { render } from './render.ts'

it('Renders a DIV element by default', () => {
  const element = render({})
  expect(element instanceof HTMLElement).toBe(true)
  expect(element?.tagName).toBe('DIV')
})
