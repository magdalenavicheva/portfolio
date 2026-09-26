import "@testing-library/jest-dom"
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

// jsdom has no matchMedia
Object.defineProperty(globalThis, "matchMedia", {
    writable: true,
    value: (query: string) => ({
        matches: query.includes("reduce"), // skip the intro animation in tests
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        onchange: null,
        dispatchEvent: () => false,
    }),
})

afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    localStorage.clear()
})
