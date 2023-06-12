export interface PlainNode {
  data?: unknown
  parentData?: unknown
  value?: string
  tag?: string
  href?: string
  element: HTMLElement
  update?: (plainNode: PlainNode) => HTMLElement | undefined
  onCreate?: (element: HTMLElement) => void
  condition?: (data: unknown | undefined) => boolean
  text?: string
  children?: PlainNode[]
  loop?: [string, PlainNode]
}

export function renderInto (query: string, plainNode: PlainNode): void {
  const parentElement = document.querySelector(query)
  if (parentElement === null) { console.error('[render] No element found for ' + query); return }
  parentElement.innerHTML = ''
  const element = render(plainNode)
  if (typeof element === 'undefined') { console.error('[render] Could not render plainNode: ', plainNode); return }
  parentElement.append(element)
}

export function render (plainNode: PlainNode): HTMLElement | undefined {
  if (typeof plainNode.update !== 'function') {
    plainNode.update = () => render(plainNode)
  }
  const isUpdate = plainNode.element instanceof HTMLElement
  if (!isUpdate) {
    plainNode.element = document.createElement(plainNode.tag ?? 'div')
  }
  let key: keyof typeof plainNode
  for (key in plainNode) {
    if (['tag', 'element', 'data', 'update'].includes(key)) continue
    switch (key.toString()) {
      case 'value':
        (plainNode.element as HTMLInputElement).value = _parseString(plainNode.value, plainNode.data)
        break
      case 'onCreate':
        plainNode.onCreate!.apply(plainNode, [plainNode.element])
        break
      case 'condition':
        if (!plainNode.condition!(plainNode.data)) return
        break
      case 'text':
        plainNode.element.innerHTML = _parseString(plainNode.text, plainNode.data)
        break
      case 'children':
        _renderChildren(plainNode)
        break
      case 'loop':
        _renderLoop(plainNode)
        break
      default:
        if (key.startsWith('on')) {
          if (isUpdate) continue
          const eventListener = (plainNode[key]! as () => void).bind(plainNode)
          plainNode.element.addEventListener(
            key.substring(2).toLowerCase(),
            eventListener
          )
          continue
        }
        plainNode.element.setAttribute(
          key,
          _parseString(plainNode[key] as string, plainNode.data)
        )
    }
  }
  return plainNode.element
}

function _renderChildren (plainNode: PlainNode): void {
  for (let i = 0; i < plainNode.children!.length; i++) {
    const childPlainNode = plainNode.children![i]
    if (typeof childPlainNode.data === 'undefined') {
      childPlainNode.data = plainNode.data
    }
    if (typeof childPlainNode.update === 'undefined') {
      childPlainNode.update = plainNode.update
    }
    const isFocusedInput = childPlainNode.tag === 'input' &&
            (childPlainNode.element != null) &&
            childPlainNode.element === document.activeElement
    const childElement = render(childPlainNode)
    if (childElement == null) {
      if (childPlainNode.element?.parentNode != null) {
        childPlainNode.element.parentNode.removeChild(childPlainNode.element)
      }
      continue
    }
    if (plainNode.element.children[i] === childElement) {
      continue
    }
    plainNode.element.insertBefore(childElement, plainNode.element.children[i + 1])
    if (isFocusedInput) {
      setTimeout(() => {
        childPlainNode.element.focus()
      })
    }
  }

  // Remove nodes from DOM that aren't in the PlainNode anymore.
  for (let i = 0; i < plainNode.element.children.length; i++) {
    const childElement = plainNode.element.children[i]
    if (plainNode.children!.find(childPlainNode => childPlainNode.element === childElement) == null) {
      childElement.parentNode?.removeChild(childElement)
    }
  }
}

function _renderLoop (plainNode: PlainNode): void {
  const arrayKey = plainNode.loop![0] as keyof typeof plainNode.data
  const array = (plainNode.data as Record<string, [{ node?: PlainNode }]>)[arrayKey]
  array.forEach((itemData) => {
    if (typeof itemData.node !== 'undefined') {
      return render(itemData.node)
    }
    itemData.node = {
      ...plainNode.loop![1]
    }
    itemData.node.data = itemData
    itemData.node.parentData = plainNode.data
    itemData.node.update = plainNode.update
    plainNode.element.appendChild(render(itemData.node)!)
  })
  for (let i = 0; i < plainNode.element.children.length; i++) {
    const childElement = plainNode.element.children[i]
    if (array.find(itemData => itemData.node?.element === childElement) == null) {
      childElement.parentNode!.removeChild(childElement)
    }
  }
}

function _parseString (string = '', data: unknown = {}): string {
  return (string + '').replace(/{{[^}]+}}/g, (match): string => {
    const key: string = match.substring(2, match.length - 2).trim()
    if (key.includes('.')) {
      let subData: unknown = data
      for (const subKey of key.split('.')) {
        subData = (subData as Record<string, unknown>)[subKey]
      }
      return subData as string
    }
    return (data as Record<string, string>)[key] ?? ''
  })
}
