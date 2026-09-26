import { useCallback, useEffect, useReducer, useState, type ReactNode } from "react"
import Icon, { type IconName } from "../components/Icons"
import { profile } from "../content/profile"
import { projects } from "../content/projects"
import { useSettings } from "../context/Settings"
import { strings } from "../i18n/strings"
import type { L, Lang } from "../i18n/types"
import AboutApp from "./apps/AboutApp"
import ContactApp from "./apps/ContactApp"
import ExperienceApp from "./apps/ExperienceApp"
import ProjectApp from "./apps/ProjectApp"
import ProjectsApp from "./apps/ProjectsApp"
import SkillsApp from "./apps/SkillsApp"
import WindowFrame from "./WindowFrame"
import { focusedWindow, initialWm, wmReducer, type AppId } from "./windowManager"

const APPS: Record<AppId, { title: L; icon: IconName; width: number }> = {
    about: { title: strings.apps.about, icon: "user", width: 560 },
    projects: { title: strings.apps.projects, icon: "folder", width: 600 },
    project: { title: strings.apps.project, icon: "file", width: 620 },
    experience: { title: strings.apps.experience, icon: "briefcase", width: 560 },
    skills: { title: strings.apps.skills, icon: "layers", width: 540 },
    contact: { title: strings.apps.contact, icon: "mail", width: 580 },
}

type Shortcut =
    | { kind: "app"; id: AppId; label: L; icon: IconName }
    | { kind: "link"; href: string; label: L; icon: IconName; download?: boolean }

const SHORTCUTS: Shortcut[] = [
    { kind: "app", id: "about", label: strings.apps.about, icon: "user" },
    { kind: "app", id: "projects", label: strings.apps.projects, icon: "folder" },
    { kind: "app", id: "experience", label: strings.apps.experience, icon: "briefcase" },
    { kind: "app", id: "skills", label: strings.apps.skills, icon: "layers" },
    { kind: "app", id: "contact", label: strings.apps.contact, icon: "mail" },
    { kind: "link", href: profile.cv, label: strings.apps.cv, icon: "file", download: true },
    { kind: "link", href: profile.github, label: strings.apps.github, icon: "code" },
    { kind: "link", href: profile.linkedin, label: strings.apps.linkedin, icon: "idcard" },
]

function useIsMobile() {
    const query = "(max-width: 760px)"
    const [mobile, setMobile] = useState(() => globalThis.matchMedia?.(query).matches ?? false)
    useEffect(() => {
        const mq = globalThis.matchMedia?.(query)
        if (!mq) return
        const onChange = () => setMobile(mq.matches)
        mq.addEventListener("change", onChange)
        return () => mq.removeEventListener("change", onChange)
    }, [])
    return mobile
}

function useClock(lang: Lang) {
    const [now, setNow] = useState(() => new Date())
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 20_000)
        return () => clearInterval(id)
    }, [])
    const locale = lang === "bg" ? "bg-BG" : "en-GB"
    return {
        day: now.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short" }),
        time: now.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }),
    }
}

function projectFromHash(): string | null {
    const hash = globalThis.location?.hash.replace("#", "") ?? ""
    return projects.some((p) => p.id === hash) ? hash : null
}

function ShortcutButton({ shortcut, onOpen, className, children }: { shortcut: Shortcut; onOpen: (id: AppId) => void; className: string; children: ReactNode }) {
    if (shortcut.kind === "link") {
        return (
            <a
                className={className}
                href={shortcut.href}
                {...(shortcut.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
            >
                {children}
            </a>
        )
    }
    return (
        <button type="button" className={className} onClick={() => onOpen(shortcut.id)}>
            {children}
        </button>
    )
}

export default function Desktop() {
    const { t, lang, setLang, theme, toggleTheme } = useSettings()
    const mobile = useIsMobile()
    const clock = useClock(lang)
    const [wm, dispatch] = useReducer(wmReducer, initialWm)
    const focused = focusedWindow(wm)

    const open = useCallback((id: AppId) => dispatch({ type: "open", id }), [])

    const openProject = useCallback((projectId: string) => {
        const vw = globalThis.innerWidth
        dispatch({ type: "open", id: "project", projectId, x: Math.max(120, vw - 700), y: 90 })
    }, [])

    // First visit: open "About me" and the Projects folder so the work is visible straight away.
    useEffect(() => {
        const fromHash = projectFromHash()
        if (globalThis.matchMedia?.("(max-width: 760px)").matches) {
            if (fromHash) dispatch({ type: "open", id: "project", projectId: fromHash })
            return
        }
        const vw = globalThis.innerWidth
        // About sits right of the desktop icons; Projects goes beside it, below the sticky note.
        const aboutX = 212
        const projectsX = Math.max(aboutX + 180, Math.min(aboutX + APPS.about.width + 24, vw - APPS.projects.width - 24))
        dispatch({ type: "open", id: "about", x: aboutX, y: 60 })
        dispatch({ type: "open", id: "projects", x: projectsX, y: vw >= 1400 ? 280 : 170 })
        if (fromHash) dispatch({ type: "open", id: "project", projectId: fromHash, x: Math.max(180, vw - 720), y: 96 })
    }, [])

    // Keep the address bar pointing at the open project, so a project can be shared by link.
    useEffect(() => {
        const projectOpen = wm.windows.some((w) => w.id === "project" && !w.minimized)
        const hash = projectOpen && wm.projectId ? `#${wm.projectId}` : ""
        if (globalThis.location.hash !== hash) {
            try {
                globalThis.history?.replaceState(null, "", `${globalThis.location.pathname}${globalThis.location.search}${hash}`)
            } catch {
                /* some embedded previews don't allow it; sharing by link just won't include the project */
            }
        }
    }, [wm.windows, wm.projectId])

    function renderApp(id: AppId) {
        switch (id) {
            case "about":
                return <AboutApp open={open} />
            case "projects":
                return <ProjectsApp openProject={openProject} />
            case "project":
                return <ProjectApp projectId={wm.projectId ?? projects[0].id} show={(pid) => dispatch({ type: "showProject", projectId: pid })} />
            case "experience":
                return <ExperienceApp />
            case "skills":
                return <SkillsApp />
            case "contact":
                return <ContactApp />
        }
    }

    function windowTitle(id: AppId) {
        if (id === "project") {
            const p = projects.find((x) => x.id === wm.projectId) ?? projects[0]
            return p.title
        }
        return t(APPS[id].title)
    }

    const openIds = new Set(wm.windows.map((w) => w.id))
    const anyOpenOnMobile = mobile && wm.windows.some((w) => !w.minimized)

    return (
        <div className={`os${mobile ? " os--mobile" : ""}`}>
            <a className="skip-link" href="#desktop-icons">
                {t(strings.skipToContent)}
            </a>

            <header className="menubar">
                <button type="button" className="menubar__brand" onClick={() => open("about")}>
                    <span className="menubar__logo" aria-hidden="true">
                        MV
                    </span>
                    <span className="menubar__name">Magdalena Vicheva</span>
                </button>
                <nav className="menubar__menu" aria-label="Main">
                    <button type="button" onClick={() => open("projects")}>
                        {t(strings.apps.projects)}
                    </button>
                    <button type="button" onClick={() => open("experience")}>
                        {t(strings.apps.experience)}
                    </button>
                    <button type="button" onClick={() => open("contact")}>
                        {t(strings.apps.contact)}
                    </button>
                </nav>
                <div className="menubar__right">
                    <button type="button" className="status" onClick={() => open("contact")}>
                        <span className="status__dot" aria-hidden="true" />
                        {t(strings.menu.status)}
                    </button>
                    <div className="lang" role="group" aria-label={t(strings.menu.language)}>
                        {(["en", "bg"] as Lang[]).map((code) => (
                            <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>
                                {code.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="icon-btn"
                        onClick={toggleTheme}
                        aria-label={t(theme === "dark" ? strings.menu.toLight : strings.menu.toDark)}
                        title={t(theme === "dark" ? strings.menu.toLight : strings.menu.toDark)}
                    >
                        <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
                    </button>
                    <span className="menubar__clock">
                        <span className="menubar__day">{clock.day}</span> {clock.time}
                    </span>
                </div>
            </header>

            <main className="desktop" id="main" aria-hidden={anyOpenOnMobile || undefined}>
                <div className="wallpaper" aria-hidden="true">
                    <p className="wallpaper__name">
                        {lang === "bg" ? "Магдалена" : "Magdalena"}
                        <br />
                        <em>{lang === "bg" ? "Вичева" : "Vicheva"}</em>
                    </p>
                    <p className="wallpaper__role">{t(strings.desktop.role)}</p>
                </div>

                <nav className="icons" id="desktop-icons" aria-label="Desktop">
                    <ul>
                        {SHORTCUTS.map((s) => (
                            <li key={s.label.en}>
                                <ShortcutButton shortcut={s} onOpen={open} className="icon">
                                    <span className="icon__art">
                                        <Icon name={s.icon} size={mobile ? 26 : 28} strokeWidth={1.5} />
                                    </span>
                                    <span className="icon__label">{t(s.label)}</span>
                                </ShortcutButton>
                            </li>
                        ))}
                    </ul>
                </nav>

                <aside className="sticky" aria-label={t(strings.desktop.noteTitle)}>
                    <p className="sticky__title">{t(strings.desktop.noteTitle)}</p>
                    <p className="sticky__text">{t(strings.desktop.note)}</p>
                    <button type="button" className="sticky__cta" onClick={() => open("contact")}>
                        {t(strings.desktop.noteCta)} <Icon name="arrowRight" size={14} />
                    </button>
                </aside>
            </main>

            {wm.windows.map((win) => (
                <WindowFrame
                    key={win.id}
                    win={win}
                    title={windowTitle(win.id)}
                    icon={APPS[win.id].icon}
                    width={APPS[win.id].width}
                    focused={focused === win.id}
                    mobile={mobile}
                    onFocus={() => dispatch({ type: "focus", id: win.id })}
                    onClose={() => dispatch({ type: "close", id: win.id })}
                    onMinimize={() => dispatch({ type: "minimize", id: win.id })}
                    onMove={(x, y) => dispatch({ type: "move", id: win.id, x, y })}
                >
                    {renderApp(win.id)}
                </WindowFrame>
            ))}

            {!mobile && (
                <nav className="dock" aria-label="Dock">
                    {SHORTCUTS.map((s, i) => (
                        <div key={s.label.en} className={`dock__slot${i === 5 ? " dock__slot--sep" : ""}`}>
                            <ShortcutButton shortcut={s} onOpen={open} className="dock__item">
                                <Icon name={s.icon} size={22} strokeWidth={1.5} />
                                <span className="dock__tip">{t(s.label)}</span>
                            </ShortcutButton>
                            {s.kind === "app" && openIds.has(s.id) && <span className="dock__dot" aria-hidden="true" />}
                        </div>
                    ))}
                </nav>
            )}
        </div>
    )
}
