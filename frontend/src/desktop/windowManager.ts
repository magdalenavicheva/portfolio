/**
 * A tiny window manager: which windows are open, where they are, which is on top.
 * Kept as a pure reducer so it is easy to test.
 */

export type AppId = "about" | "projects" | "project" | "experience" | "skills" | "contact"

export type WindowState = {
    id: AppId
    x: number
    y: number
    z: number
    minimized: boolean
}

export type WmState = {
    windows: WindowState[]
    topZ: number
    /** Which project the "project" window shows. */
    projectId: string | null
}

export type WmAction =
    | { type: "open"; id: AppId; x?: number; y?: number; projectId?: string }
    | { type: "close"; id: AppId }
    | { type: "focus"; id: AppId }
    | { type: "minimize"; id: AppId }
    | { type: "move"; id: AppId; x: number; y: number }
    | { type: "showProject"; projectId: string }

export const initialWm: WmState = { windows: [], topZ: 10, projectId: null }

export function wmReducer(state: WmState, action: WmAction): WmState {
    switch (action.type) {
        case "open": {
            const z = state.topZ + 1
            const projectId = action.projectId ?? state.projectId
            const existing = state.windows.find((w) => w.id === action.id)
            if (existing) {
                return {
                    ...state,
                    topZ: z,
                    projectId,
                    windows: state.windows.map((w) => (w.id === action.id ? { ...w, z, minimized: false } : w)),
                }
            }
            // cascade new windows so they never land exactly on top of each other
            const offset = (state.windows.length % 5) * 28
            return {
                ...state,
                topZ: z,
                projectId,
                windows: [
                    ...state.windows,
                    { id: action.id, x: action.x ?? 180 + offset, y: action.y ?? 70 + offset, z, minimized: false },
                ],
            }
        }
        case "close":
            return { ...state, windows: state.windows.filter((w) => w.id !== action.id) }
        case "focus": {
            const target = state.windows.find((w) => w.id === action.id)
            if (!target || target.z === state.topZ) return state
            const z = state.topZ + 1
            return { ...state, topZ: z, windows: state.windows.map((w) => (w.id === action.id ? { ...w, z } : w)) }
        }
        case "minimize":
            return { ...state, windows: state.windows.map((w) => (w.id === action.id ? { ...w, minimized: true } : w)) }
        case "move":
            return { ...state, windows: state.windows.map((w) => (w.id === action.id ? { ...w, x: action.x, y: action.y } : w)) }
        case "showProject":
            return { ...state, projectId: action.projectId }
        default:
            return state
    }
}

/** The window the user is working in: the highest visible one. */
export function focusedWindow(state: WmState): AppId | null {
    const visible = state.windows.filter((w) => !w.minimized)
    if (visible.length === 0) return null
    return visible.reduce((a, b) => (b.z > a.z ? b : a)).id
}
