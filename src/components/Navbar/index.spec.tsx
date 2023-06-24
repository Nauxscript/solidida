import { describe, it } from 'vitest'
import { cleanup, render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import { Router } from '@solidjs/router'
import Navbar, { navItems } from '.'

describe('Component: Navbar', () => {
  beforeEach(() => {
    render(() => (
      <Router>
        <Navbar></Navbar>
      </Router>
    ))
  })
  afterEach(cleanup)
  it('happy path', () => {
    const navbar = screen.getByRole('navigation')
    const listItems = screen.getAllByRole('listitem')
    expect(navbar).toBeInTheDocument()
    expect(listItems.length).toEqual(navItems.length)
  })

  it('navbar navigation working good', async () => {
    const user = userEvent.setup()

    // Promise.all(listItems.map(async (item, index) => {
    //   await user.click(item)
    //   expect(location.pathname).toBe(navItems[index].href)
    // }))
  })
})
