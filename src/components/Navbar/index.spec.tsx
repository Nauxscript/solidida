import { describe, it, vi } from 'vitest'
import { cleanup, render, renderHook, screen } from '@solidjs/testing-library'
import userEvent from '@testing-library/user-event'
import { Router } from '@solidjs/router'
import { showSearchPanel, useSearch } from '../Command/useSearch'
import Navbar, { goToGithub, navItems, useGoto } from '.'

// abandoned tests for reference
describe.skip('Component: Navbar', () => {
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

describe('Navbar', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })
  test('useGoto', () => {
    const { result, cleanup } = renderHook(useGoto, {
      wrapper: Router,
    })
    const { currHref, handleNavigate } = result

    navItems.forEach((item) => {
      handleNavigate(item.href)
      expect(currHref()).toBe(item.href)
    })

    cleanup()
  })

  test('goToGithub', () => {
    window.open = vi.fn()
    goToGithub()
    expect(window.open).toBeCalledWith('https://github.com/Nauxscript/solidida')
  })

  test('search panel', () => {
    const { openSearchPanel, closeSearchPanel } = useSearch()
    openSearchPanel()
    expect(showSearchPanel()).toBe(true)
    closeSearchPanel()
    expect(showSearchPanel()).toBe(false)
  })
})
