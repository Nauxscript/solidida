import { describe, it } from 'vitest'
import { cleanup, render, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import { Router } from '@solidjs/router'
import Navbar, { navItems } from '.'

describe('Component: Navbar', () => {
  // bug of happy-dom https://github.com/capricorn86/happy-dom/issues/868; This step is not necessary in jsdom.
  // location.assign('https://localhost')
  beforeEach(() => {
    render(() => (
      <Router>
        <Navbar></Navbar>
      </Router>
    ))
  })
  afterEach(() => {
    cleanup()
    window.history.pushState({}, '', '/')
  })
  it('happy path', () => {
    const navbar = screen.getByRole('navigation')
    const listItems = screen.getAllByRole('listitem')
    expect(navbar).toBeInTheDocument()
    expect(listItems.length).toEqual(navItems.length)
  })

  it('go to home page', async () => {
    const ele = screen.getByTestId('home')
    const user = userEvent.setup()
    await user.click(ele)
    expect(location.pathname).toBe('/')
  })

  it('go to calendar page', async () => {
    const ele = screen.getByTestId('calendar')
    const user = userEvent.setup()
    await user.click(ele)
    expect(location.pathname).toBe('/calendar')
  })

  it('go to habit page', async () => {
    const ele = screen.getByTestId('habit')
    const user = userEvent.setup()
    await user.click(ele)
    expect(location.pathname).toBe('/habit')
  })

  it('show search dialog', async () => {
    const ele = screen.getByTestId('search')
    const user = userEvent.setup()
    await user.click(ele)
    expect(location.pathname).toBe('/')
  })
})
