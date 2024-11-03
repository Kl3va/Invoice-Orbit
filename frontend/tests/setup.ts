import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'
import { cleanup } from '@testing-library/react'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// Mock ResizeObserver which is often needed for React testing
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
