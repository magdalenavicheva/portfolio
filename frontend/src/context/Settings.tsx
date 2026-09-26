import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { L, Lang } from "../i18n/types"

export type Theme = "light" | "dark"

type SettingsValue = {
    lang: Lang
    setLang: (lang: Lang) => void
    theme: Theme
    toggleTheme: () => void
    /** Translate a bilingual string into the current language. */
    t: (text: L) => string
}

const SettingsContext = createContext<SettingsValue | null>(null)

function readStored(key: string): string | null {
    try {
        return globalThis.localStorage?.getItem(key) ?? null
    } catch {
        return null
    }
}

function store(key: string, value: string) {
    try {
        globalThis.localStorage?.setItem(key, value)
    } catch {
        /* private mode: the choice just isn't remembered */
    }
}

function initialTheme(): Theme {
    const saved = readStored("mv-theme")
    if (saved === "light" || saved === "dark") return saved
    const attr = document.documentElement.getAttribute("data-theme")
    if (attr === "light" || attr === "dark") return attr
    return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function initialLang(): Lang {
    const saved = readStored("mv-lang")
    if (saved === "en" || saved === "bg") return saved
    return navigator.language?.toLowerCase().startsWith("bg") ? "bg" : "en"
}

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(initialLang)
    const [theme, setTheme] = useState<Theme>(initialTheme)

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    const setLang = useCallback((next: Lang) => {
        setLangState(next)
        store("mv-lang", next)
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme((current) => {
            const next = current === "dark" ? "light" : "dark"
            store("mv-theme", next)
            return next
        })
    }, [])

    const t = useCallback((text: L) => text[lang], [lang])

    const value = useMemo(() => ({ lang, setLang, theme, toggleTheme, t }), [lang, setLang, theme, toggleTheme, t])

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings(): SettingsValue {
    const value = useContext(SettingsContext)
    if (!value) throw new Error("useSettings must be used inside <SettingsProvider>")
    return value
}
