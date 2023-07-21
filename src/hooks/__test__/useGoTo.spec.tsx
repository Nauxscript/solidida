import { Router } from '@solidjs/router'
import { renderHook } from '@solidjs/testing-library'
import { vi } from 'vitest'
import { goToGithub, useGoto } from '../useGoto'

describe('Navbar', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })
  test('useGoto', () => {
    const { result, cleanup } = renderHook(useGoto, {
      wrapper: Router,
    })
    const { currHref, handleNavigate } = result

    handleNavigate('/')
    expect(currHref()).toBe('/')
    cleanup()
  })

  test('goToGithub', () => {
    window.open = vi.fn()
    goToGithub()
    expect(window.open).toBeCalledWith('https://github.com/Nauxscript/solidida')
  })
})
