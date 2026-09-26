import { focusedWindow, initialWm, wmReducer } from "../desktop/windowManager"

describe("window manager", () => {
    it("opens windows on top of each other and focuses the newest", () => {
        let s = wmReducer(initialWm, { type: "open", id: "about" })
        s = wmReducer(s, { type: "open", id: "projects" })
        expect(s.windows).toHaveLength(2)
        expect(focusedWindow(s)).toBe("projects")
    })

    it("re-opening an existing window brings it to the front instead of duplicating it", () => {
        let s = wmReducer(initialWm, { type: "open", id: "about" })
        s = wmReducer(s, { type: "open", id: "projects" })
        s = wmReducer(s, { type: "open", id: "about" })
        expect(s.windows).toHaveLength(2)
        expect(focusedWindow(s)).toBe("about")
    })

    it("minimised windows lose focus and come back when opened again", () => {
        let s = wmReducer(initialWm, { type: "open", id: "about" })
        s = wmReducer(s, { type: "open", id: "contact" })
        s = wmReducer(s, { type: "minimize", id: "contact" })
        expect(focusedWindow(s)).toBe("about")
        s = wmReducer(s, { type: "open", id: "contact" })
        expect(s.windows.find((w) => w.id === "contact")?.minimized).toBe(false)
        expect(focusedWindow(s)).toBe("contact")
    })

    it("moves, closes and remembers which project is shown", () => {
        let s = wmReducer(initialWm, { type: "open", id: "project", projectId: "triply" })
        s = wmReducer(s, { type: "move", id: "project", x: 300, y: 200 })
        expect(s.windows[0]).toMatchObject({ x: 300, y: 200 })
        s = wmReducer(s, { type: "showProject", projectId: "nera" })
        expect(s.projectId).toBe("nera")
        s = wmReducer(s, { type: "close", id: "project" })
        expect(s.windows).toHaveLength(0)
        expect(focusedWindow(s)).toBeNull()
    })
})
