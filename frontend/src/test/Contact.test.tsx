import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ContactApp from "../desktop/apps/ContactApp"
import { renderWithSettings } from "./helpers"

describe("Contact window", () => {
    it("has a button that opens an e-mail to Magdalena", () => {
        renderWithSettings(<ContactApp />)
        const button = screen.getByRole("link", { name: /write me an e-mail/i })
        expect(button.getAttribute("href")).toBe("mailto:mvicheva2024@gmail.com?subject=Internship%20opportunity")
    })

    it("also offers Gmail and Outlook in the browser", () => {
        renderWithSettings(<ContactApp />)
        const gmail = screen.getByRole("link", { name: /gmail/i })
        const outlook = screen.getByRole("link", { name: /outlook/i })
        expect(gmail.getAttribute("href")).toContain("mail.google.com/mail/?view=cm&fs=1&to=mvicheva2024@gmail.com")
        expect(outlook.getAttribute("href")).toContain("outlook.office.com/mail/deeplink/compose?to=mvicheva2024@gmail.com")
        expect(gmail).toHaveAttribute("target", "_blank")
    })

    it("shows the contact details from the CV", () => {
        renderWithSettings(<ContactApp />)
        expect(screen.getByText("mvicheva2024@gmail.com")).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /in\/magdalenavicheva/ })).toHaveAttribute(
            "href",
            "https://www.linkedin.com/in/magdalenavicheva/"
        )
        expect(screen.getByRole("link", { name: /download \(pdf\)/i })).toHaveAttribute("href", "/Magdalena_Vicheva_CV.pdf")
    })

    it("copies the address to the clipboard", async () => {
        const user = userEvent.setup()
        renderWithSettings(<ContactApp />)
        await user.click(screen.getByRole("button", { name: /copy/i }))
        expect(await navigator.clipboard.readText()).toBe("mvicheva2024@gmail.com")
        expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument()
    })

    it("writes the subject in Bulgarian when the site is in Bulgarian", async () => {
        localStorage.setItem("mv-lang", "bg")
        renderWithSettings(<ContactApp />)
        const button = screen.getByRole("link", { name: /напишете ми имейл/i })
        expect(button.getAttribute("href")).toContain(encodeURIComponent("Възможност за стаж"))
    })
})
