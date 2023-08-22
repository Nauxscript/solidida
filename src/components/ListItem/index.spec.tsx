import { describe, vi } from 'vitest'
import { cleanup, render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import type { ListItemProps } from '.'
import ListItem, { toolBtnIcon } from '.'

describe('Component: ListItem', () => {
  afterEach(cleanup)

  it('basic list item is working fine', async () => {
    const user = userEvent.setup()
    const itemClick = vi.fn()
    const itemProps: ListItemProps = {
      id: 1,
      index: 0,
      title: 'basic list item',
      itemClick,
    }
    render(() => <ListItem {...itemProps}></ListItem>)
    const ele = screen.getByText('basic list item')
    expect(ele).toBeInTheDocument()
    await user.click(ele)

    expect(itemClick).toBeCalledTimes(1)
  })

  it('list item with icon', () => {
    const itemProps: ListItemProps = {
      id: 1,
      index: 0,
      title: 'list item with icon',
      icon: 'test-icon',
    }
    render(() => <ListItem {...itemProps}></ListItem>)
    const ele = screen.getByRole('listitem')
    expect(ele).toBeInTheDocument()
    const iconEle = ele.querySelector('.test-icon')
    expect(iconEle).toBeInTheDocument()
  })

  it.todo('list item with tool button', async () => {
    const user = userEvent.setup()
    const itemProps: ListItemProps = {
      id: 1,
      index: 0,
      title: 'list item with icon',
      hasTool: true,
    }
    render(() => <ListItem {...itemProps}></ListItem>)
    const ele = screen.getByRole('listitem')
    expect(ele).toBeInTheDocument()
    const toolBtn = ele.querySelector(`.${toolBtnIcon}`) as HTMLElement
    expect(toolBtn).not.toBeVisible()

    await user.hover(ele)
    const style = getComputedStyle(toolBtn)
    // console.log(style)
    // const _style = getComputedStyle(ele)
    // console.log(_style)
    // somthing wrong ....
    // expect(toolBtn).toBeVisible()
  })
})
