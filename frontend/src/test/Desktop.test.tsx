import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { projects } from "../content/projects"
import Desktop from "../desktop/Desktop"
import { renderWithSettings } from "./helpers"

describe("Desktop", () => {
    it("opens About me and Projects on the first visit", () => {
        renderWithSettings(<Desktop />)
        expect(screen.getByRole("dialog", { name: "About me" })).toBeInTheDocument()
        expect(screen.getByRole("dialog", { name: "Projects" })).toBeInTheDocument()
        expect(screen.getByText("Hi, I'm Maggie.")).toBeInTheDocument()
    })

    it("opens each project with a GitHub button per repository", async () => {
        renderWithSettings(<Desktop />)
        const folder = screen.getByRole("dialog", { name: "Projects" })

        for (const project of projects) {
            await userEvent.click(within(folder).getByRole("button", { name: new RegExp(`^${project.title}`) }))
            const win = screen.getByRole("dialog", { name: project.title })
            const links = within(win).getAllByRole("link", { name: /view on github/i })
            expect(links.map((l) => l.getAttribute("href"))).toEqual(project.repos.map((r) => r.url))
            links.forEach((l) => expect(l).toHaveAttribute("target", "_blank"))
        }
    })

    it("closes a window with its close button and reopens it from the dock", async () => {
        renderWithSettings(<Desktop />)
        await userEvent.click(screen.getByRole("button", { name: "Close About me" }))
        expect(screen.queryByRole("dialog", { name: "About me" })).not.toBeInTheDocument()

        const dock = screen.getByRole("navigation", { name: "Dock" })
        await userEvent.click(within(dock).getByRole("button", { name: "About me" }))
        expect(screen.getByRole("dialog", { name: "About me" })).toBeInTheDocument()
    })

    it("filters the Projects folder", async () => {
        renderWithSettings(<Desktop />)
        const folder = screen.getByRole("dialog", { name: "Projects" })
        await userEvent.click(within(folder).getByRole("button", { name: "C# & .NET" }))
        expect(within(folder).getByRole("button", { name: /^NERA/ })).toBeInTheDocument()
        expect(within(folder).queryByRole("button", { name: /^Triply/ })).not.toBeInTheDocument()
    })

    it("switches to Bulgarian and to dark mode", async () => {
        renderWithSettings(<Desktop />)
        await userEvent.click(screen.getByRole("button", { name: "BG" }))
        expect(screen.getByRole("dialog", { name: "За мен" })).toBeInTheDocument()
        expect(document.documentElement.lang).toBe("bg")

        const before = document.documentElement.getAttribute("data-theme")
        await userEvent.click(screen.getByRole("button", { name: /режим/ }))
        expect(document.documentElement.getAttribute("data-theme")).not.toBe(before)
    })

    it("Escape closes the focused window", async () => {
        renderWithSettings(<Desktop />)
        const about = screen.getByRole("dialog", { name: "About me" })
        about.focus()
        await userEvent.keyboard("{Escape}")
        expect(screen.queryByRole("dialog", { name: "About me" })).not.toBeInTheDocument()
    })
})
