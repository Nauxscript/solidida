import { describe, vi } from 'vitest'
import { cleanup, render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import type { ListItemProps } from '.'
import ListItem from '.'

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
})
