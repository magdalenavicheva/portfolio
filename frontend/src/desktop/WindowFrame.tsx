import { useEffect, useRef, type KeyboardEvent, type PointerEvent, type ReactNode } from "react"
import { useSettings } from "../context/Settings"
import { strings } from "../i18n/strings"
import Icon, { type IconName } from "../components/Icons"
import type { WindowState } from "./windowManager"

type WindowFrameProps = {
    win: WindowState
    title: string
    icon: IconName
    width: number
    focused: boolean
    mobile: boolean
    onFocus: () => void
    onClose: () => void
    onMinimize: () => void
    onMove: (x: number, y: number) => void
    children: ReactNode
    /** Extra content on the right of the title bar (e.g. item count). */
    titleExtra?: ReactNode
}

const MENU_BAR = 40

export default function WindowFrame(props: WindowFrameProps) {
    const { win, title, icon, width, focused, mobile, onFocus, onClose, onMinimize, onMove, children, titleExtra } = props
    const { t } = useSettings()
    const ref = useRef<HTMLElement>(null)
    const drag = useRef<{ dx: number; dy: number } | null>(null)
    const titleId = `win-${win.id}-title`

    // Move keyboard focus into a window when it opens, so screen readers and keyboards follow along.
    useEffect(() => {
        ref.current?.focus({ preventScroll: true })
    }, [])

    function startDrag(event: PointerEvent<HTMLDivElement>) {
        if (mobile || event.button !== 0) return
        if ((event.target as HTMLElement).closest("button")) return
        onFocus()
        drag.current = { dx: event.clientX - win.x, dy: event.clientY - win.y }
        try {
            event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
            /* synthetic events (tests) have no real pointer to capture */
        }
    }

    function moveDrag(event: PointerEvent<HTMLDivElement>) {
        if (!drag.current) return
        const maxX = globalThis.innerWidth - 120
        const maxY = globalThis.innerHeight - 120
        const x = Math.min(maxX, Math.max(120 - width, event.clientX - drag.current.dx))
        const y = Math.min(maxY, Math.max(MENU_BAR + 4, event.clientY - drag.current.dy))
        onMove(x, y)
    }

    function endDrag() {
        drag.current = null
    }

    function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            event.stopPropagation()
            onClose()
        }
    }

    return (
        <section
            ref={ref}
            className={`window${focused ? " window--focused" : ""}${mobile ? " window--mobile" : ""}`}
            style={mobile ? { zIndex: win.z } : { left: win.x, top: win.y, width, zIndex: win.z }}
            role="dialog"
            aria-labelledby={titleId}
            tabIndex={-1}
            onPointerDown={onFocus}
            onKeyDown={onKeyDown}
            hidden={win.minimized}
        >
            <div
                className="window__bar"
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
            >
                {mobile ? (
                    <button type="button" className="window__back" onClick={onClose}>
                        <Icon name="arrowLeft" size={18} /> {t(strings.window.back)}
                    </button>
                ) : (
                    <div className="window__controls">
                        <button type="button" className="window__btn window__btn--close" onClick={onClose} aria-label={`${t(strings.window.close)} ${title}`}>
                            <Icon name="close" size={10} strokeWidth={2.4} />
                        </button>
                        <button type="button" className="window__btn window__btn--min" onClick={onMinimize} aria-label={`${t(strings.window.minimize)} ${title}`}>
                            <Icon name="minus" size={10} strokeWidth={2.4} />
                        </button>
                    </div>
                )}
                <h2 className="window__title" id={titleId}>
                    <Icon name={icon} size={15} /> {title}
                </h2>
                <div className="window__extra">{titleExtra}</div>
            </div>
            <div className="window__body">{children}</div>
        </section>
    )
}
