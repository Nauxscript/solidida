import { describe, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@solidjs/testing-library'
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
    expect(navbar).toBeInTheDocument()
  })

  it('navbar navigation working good', () => {
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toEqual(navItems.length)
    listItems.forEach((item, index) => {
      fireEvent(item, new Event('click'))
      waitFor(() => {
        expect(location.pathname).toBe(navItems[index].href)
      })
    })
  })
})
