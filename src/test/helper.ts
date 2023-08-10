export const mockPlatform = (value: string) => Object.defineProperty(window.navigator, 'platform', { value, configurable: true })
